
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';
import { DashboardService } from '../services/dashboard.service';
import { IndexDBService } from '../services/indexdb.service';
import { TimeSlot } from '../models/time-slot.model';

@Injectable()
export class DashboardEffects {
  loadCollectionRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadCollectionRequests),
      mergeMap(() =>
        from(this.indexDBService.getAllCollections()).pipe(
          map(requests => {
            const updatedRequests = requests.map(request => ({
              ...request,
              address:  '',
              date:  new Date(),
              timeSlot:  'defaultTimeSlot' as TimeSlot
            }));
            return DashboardActions.loadCollectionRequestsSuccess({ requests: updatedRequests });
          }),
          catchError(error => of(DashboardActions.loadCollectionRequestsFailure({ error })))
        )
      )
    )
  );

  createCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.createCollectionRequest),
      mergeMap(({ request }) =>
        this.dashboardService.createCollectionRequest(request).pipe(
          map(createdRequest => DashboardActions.createCollectionRequestSuccess({ request: createdRequest })),
          catchError(error => of(DashboardActions.createCollectionRequestFailure({ error })))
        )
      )
    )
  );
    addCollectionToIndexDB$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DashboardActions.createCollectionRequestSuccess),
        mergeMap(async ({ request }) => {
          console.log('innnnnnn',request);
          
          await this.indexDBService.addCollection(request);
          return DashboardActions.createCollectionRequestSuccess({ request });
        })
      )
    );

  cancelCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.cancelCollectionRequest),
      mergeMap(({ requestId }) =>
       this.indexDBService.deleteCollection(requestId).then(() =>
         DashboardActions.cancelCollectionRequestSuccess({ requestId })
    ).catch(error => DashboardActions.cancelCollectionRequestFailure({ error }))
      )
    )
  );

  loadUserPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadUserPoints),
      mergeMap(() =>
        this.dashboardService.getUserPoints().pipe(
          map(points => DashboardActions.loadUserPointsSuccess({ points })),
          catchError(error => of(DashboardActions.loadUserPointsFailure({ error })))
        )
      )
    )
  );

  // convertPoints$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(DashboardActions.convertPoints),
  //     mergeMap(({ points }) =>
  //       this.dashboardService.convertPoints(points).pipe(
  //         map(voucher => DashboardActions.convertPointsSuccess({ points, voucher })),
  //         catchError(error => of(DashboardActions.convertPointsFailure({ error })))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
        private indexDBService: IndexDBService
  ) {}
}

