import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../models/collection-request.model';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import * as DashboardActions from "../../store/dashboard.actions"
import * as DashboardSelectors from "../../store/dashboard.selectors"
@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss'
})
export class CollectionListComponent implements OnInit {
  collectionRequests$: Observable<CollectionRequest[]>

  constructor(private store: Store<AppState>) {
    this.collectionRequests$ = this.store.select(DashboardSelectors.selectAllCollectionRequests)
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadCollectionRequests())
  }

  onCancelRequest(requestId: number): void {
    this.store.dispatch(DashboardActions.cancelCollectionRequest({ requestId }))
  }
}

