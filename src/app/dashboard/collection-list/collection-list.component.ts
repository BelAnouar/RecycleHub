import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../models/collection-request.model';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../../store/dashboard.actions';
import * as DashboardSelectors from '../../store/dashboard.selectors';
import { DashboardService } from '../../services/dashboard.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss',
})
export class CollectionListComponent implements OnInit {
  collectionRequests$: Observable<CollectionRequest[]>;
  currentUser: User | null = null;
  isCollector: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.collectionRequests$ = this.dashboardService.getCollectionRequests();
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isCollector = user?.role === 'collector';
      this.getCollectionRequests();
    });
  }

  getCollectionRequests(): void {
    if (this.currentUser) {
      if (this.isCollector) {
        this.collectionRequests$ =
          this.dashboardService.getAllCollectionRequests();
      } else {
        if (this.currentUser?.id !== undefined) {
          console.log(this.currentUser.id);

          this.collectionRequests$ =
            this.dashboardService.getCollectionRequestsByUser(
              this.currentUser.id
            );
          console.log(
            this.collectionRequests$.forEach((element) => {
              console.log(element);
            })
          );
        }
      }
    }
  }

  cancelRequest(requestId: number): void {
    this.store.dispatch(
      DashboardActions.cancelCollectionRequest({ requestId })
    );
    this.getCollectionRequests();
  }
}
