import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../models/collection-request.model';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(private dashboardService: DashboardService) {}

  getCollections(): Observable<CollectionRequest[]> {
    return this.dashboardService.getCollectionRequests();
  }

  getCollectionById(id: number): Observable<CollectionRequest | undefined> {
    return new Observable(observer => {
      this.dashboardService.getCollectionRequests().subscribe(
        collections => {
          const collection = collections.find(c => c.id === id);
          observer.next(collection);
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }

  createCollection(collection: Omit<CollectionRequest, 'id' | 'status'>): Observable<CollectionRequest> {
    return this.dashboardService.createCollectionRequest(collection);
  }

  updateCollection(collection: CollectionRequest): Observable<CollectionRequest> {
    return new Observable(observer => {
      this.dashboardService.getCollectionRequests().subscribe(
        collections => {
          const index = collections.findIndex(c => c.id === collection.id);
          if (index !== -1) {
            collections[index] = collection;
            observer.next(collection);
          } else {
            observer.error(new Error('Collection not found'));
          }
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }

  deleteCollection(id: number): Observable<void> {
    return this.dashboardService.cancelCollectionRequest(id);
  }
}