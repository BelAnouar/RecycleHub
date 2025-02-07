import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CollectionRequest } from '../models/collection-request.model';
import { RequestStatus } from '../models/request-status.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private collectionRequests: CollectionRequest[] = [];
  private userPoints: number = 0;

  constructor() {}

  getCollectionRequests(): Observable<CollectionRequest[]> {
    return of(this.collectionRequests).pipe(delay(500));
  }

  createCollectionRequest(request: Omit<CollectionRequest, 'id' | 'status'>): Observable<CollectionRequest> {

    const newRequest: CollectionRequest = {
      ...request,
      id: Date.now(),
      status: 'pending' as RequestStatus
    };
    console.log(newRequest);
    
    this.collectionRequests.push(newRequest);
    return of(newRequest).pipe(delay(500));
  }

  cancelCollectionRequest(requestId: number): Observable<void> {
    this.collectionRequests = this.collectionRequests.filter(request => request.id !== requestId);
    return of(void 0).pipe(delay(500));
  }

  getUserPoints(): Observable<number> {
    return of(this.userPoints).pipe(delay(500));
  }

  convertPoints(points: number): Observable<number> {
    if (points > this.userPoints) {
      throw new Error('Insufficient points');
    }
    this.userPoints -= points;
    const voucher = this.calculateVoucher(points);
    return of(voucher).pipe(delay(500));
  }

  private calculateVoucher(points: number): number {
    if (points === 100) return 50;
    if (points === 200) return 120;
    if (points === 500) return 350;
    return 0;
  }
}