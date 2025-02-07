import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as DashboardActions from "../../store/dashboard.actions"
@Component({
  selector: 'app-collection-request',
  templateUrl: './collection-request.component.html',
  styleUrl: './collection-request.component.scss'
})
export class CollectionRequestComponent implements OnInit {
  requestForm: FormGroup;
  wasteTypes = ['plastic', 'glass', 'paper', 'metal'];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.requestForm = this.fb.group({
      wasteTypes: [[], [Validators.required]],
      weight: ['', [Validators.required, Validators.min(1000)]],
      address: ['', [Validators.required]],
      date: ['', [Validators.required]],
      timeSlot: ['', [Validators.required]],
      notes: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.requestForm.valid);
    
    if (this.requestForm.valid) {
      console.log(this.requestForm.value);
      
      this.store.dispatch(DashboardActions.createCollectionRequest({ request: this.requestForm.value }));
    }
  }

  onWasteTypeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const wasteTypes = this.requestForm.get('wasteTypes')?.value as string[];
    if (target.checked) {
      wasteTypes.push(target.value);
    } else {
      const index = wasteTypes.indexOf(target.value);
      if (index > -1) {
        wasteTypes.splice(index, 1);
      }
    }
    this.requestForm.patchValue({ wasteTypes });
  }
}