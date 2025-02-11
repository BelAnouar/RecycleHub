import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CollectionRequest } from '../models/collection-request.model';
import { RequestStatus } from '../models/request-status.model';
import { IndexDBService } from './indexdb.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private collectionRequests: CollectionRequest[] = [];
  private userPoints: number = 0;

  constructor(private indexDBService: IndexDBService) {}

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

  getAllCollectionRequests(): Observable<CollectionRequest[]> {
    return from(this.indexDBService.getAllCollections()).pipe(
      map((requests: any[]) => requests.map(request => ({
        ...request,
        wasteTypes: request.wasteTypes || [],
        address: request.address || '',
        date: request.date || new Date(),
        timeSlot: request.timeSlot || ''
      } as CollectionRequest)))
    );
  }
  getCollectionRequestsByUser(userId: number): Observable<CollectionRequest[]> {
    return from(this.indexDBService.getCollectionsByUser(userId)).pipe(
      map((requests: any[]) => requests.map(request => ({
        ...request,
        wasteTypes: request.wasteTypes || [],
        address: request.address || '',
        date: request.date || new Date(),
        timeSlot: request.timeSlot || ''
      } as CollectionRequest)))
    );
  }
  cancelCollectionRequest(requestId: number): Observable<void> {
    this.collectionRequests = this.collectionRequests.filter(request => request.id !== requestId);
    return of(void 0).pipe(delay(500));
  }

  getUserPoints(): Observable<number> {
    return of(this.userPoints).pipe(delay(500));
  }

  convertPoints(points: number,userPoints:number): Observable<number> {
   
    if (points > userPoints) {
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