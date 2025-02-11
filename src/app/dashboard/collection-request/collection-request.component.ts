import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as DashboardActions from "../../store/dashboard.actions"
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { TimeSlot } from '../../models/time-slot.model';
import { WasteType } from '../../models/waste-type.model';
import { CollectionRequest } from '../../models/collection-request.model';
import { RequestStatus } from '../../models/request-status.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-collection-request',
  templateUrl: './collection-request.component.html',
  styleUrl: './collection-request.component.scss'
})
export class CollectionRequestComponent implements OnInit {
  requestForm: FormGroup;
  currentUser: { id: number } | null = null;
  wasteTypes: string[] = ['paper', 'plastic', 'metal', 'glass', 'electronics'];
  timeSlots: TimeSlot[] = ['09:00-12:00', '12:00-15:00', '15:00-18:00'];

  constructor(private fb: FormBuilder, private store: Store,private userService: UserService) {
    this.requestForm = this.fb.group({
      wasteTypes: this.fb.array([]),
      address: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.initWasteTypes();
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user ? { id: user.id ?? 0 } : null;
     
    });
  }

  get wasteTypesArray() {
    return this.requestForm.get('wasteTypes') as FormArray;
  }

  initWasteTypes() {
    this.wasteTypes.forEach(type => {
      this.wasteTypesArray.push(this.fb.group({
        type: [type],
        selected: [false],
        weight: [0, [Validators.min(0)]]
      }));
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.value;
      const selectedWasteTypes: WasteType[] = formValue.wasteTypes
        .filter((wt: { selected: boolean; weight: number }) => wt.selected && wt.weight > 0)
        .map((wt: { type: string; weight: number }) => ({ type: wt.type, weight: wt.weight }));

      const totalWeight = selectedWasteTypes.reduce((sum, wt) => sum + wt.weight, 0);

      const request: CollectionRequest = {
        userId: this.currentUser?.id || 0, 
        wasteTypes: selectedWasteTypes,
        weight: totalWeight,
        address: formValue.address,
        date: new Date(formValue.date),
        timeSlot: formValue.timeSlot as TimeSlot,
        status: 'pending' as RequestStatus,
        notes: formValue.notes
      };
      console.log('Request:', request);
      

      this.store.dispatch(DashboardActions.createCollectionRequest({ request }));
    }
  }

  updateTotalWeight() {
    const totalWeight = this.wasteTypesArray.controls
      .reduce((sum, control) => {
        const group = control as FormGroup;
        return sum + (group.get('selected')?.value ? group.get('weight')?.value || 0 : 0);
      }, 0);
    
    console.log('Total Weight:', totalWeight);
  }
}