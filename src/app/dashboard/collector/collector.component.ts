import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../models/collection-request.model';
import { DashboardService } from '../../services/dashboard.service';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { updateCollectionRequest } from '../../store/collection.actions';
import { updateUserPoints } from '../../store/auth.actions';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.scss'
})
export class CollectorComponent implements OnInit {
  collectionRequest: CollectionRequest | undefined;
  verificationForm: FormGroup;
  loading = false;
  error: string | null = null;
  photos: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
     private store: Store<AppState>
  ) {
    this.verificationForm = this.fb.group({
      actualWeight: ['', [Validators.required, Validators.min(0)]],
      materialsVerified: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (requestId) {
      this.loading = true;
      this.dashboardService.getAllCollectionRequests().subscribe(
        requests => {
          this.collectionRequest = requests.find(r => r.id === Number(requestId));
            this.loading = false;
          if (!this.collectionRequest) {
            this.error = 'Collection request not found';
          }
        },
        error => {
          this.error = 'Error loading collection request';
          this.loading = false;
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.photos = Array.from(fileList);
    }
  }

  calculatePoints(wasteTypes: { type: string; weight: number }[]): number {
    let points = 0;
    wasteTypes.forEach(waste => {
      switch (waste.type) {
        case 'plastic':
          points += waste.weight * 2;
          break;
        case 'glass':
          points += waste.weight * 1;
          break;
        case 'paper':
          points += waste.weight * 1;
          break;
        case 'metal':
          points += waste.weight * 5;
          break;
        default:
          break;
      }
    });
    return points;
  }
  onSubmit(): void {
    if (this.verificationForm.valid && this.collectionRequest) {
      const updatedRequest: CollectionRequest = {
        ...this.collectionRequest,
        weight: this.verificationForm.get('actualWeight')?.value,
        status: 'completed',
        collectorNotes: 'Materials verified and collected.',
        photos: this.photos.map(file => URL.createObjectURL(file))
      };
      
      console.log(this.collectionRequest.wasteTypes);
      
      const points = this.calculatePoints(this.collectionRequest.wasteTypes);
      console.log('Points:', points);
      
    this.store.dispatch(updateUserPoints({ userId: this.collectionRequest.userId, points }));
     this.store.dispatch(updateCollectionRequest({request: updatedRequest}))
        this.router.navigate(['/dashboard']);
      
    }
  }

  onReject(): void {
    if (this.collectionRequest) {
      const rejectedRequest: CollectionRequest = {
        ...this.collectionRequest,
        status: 'rejected',
        collectorNotes: 'Collection rejected due to discrepancies.',
      };
      
      // In a real application, you would update the request on the server here
      // For now, we'll just update it in the local array
      this.dashboardService.getCollectionRequests().subscribe(requests => {
        const index = requests.findIndex(r => r.id === rejectedRequest.id);
        if (index !== -1) {
          requests[index] = rejectedRequest;
        }
        this.router.navigate(['/dashboard']);
      });
    }
  }
}