
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
export class DashboardEffects {
  loadCollectionRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadCollectionRequests),
      mergeMap(() =>
        this.dashboardService.getCollectionRequests().pipe(
          map(requests => DashboardActions.loadCollectionRequestsSuccess({ requests })),
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

  cancelCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.cancelCollectionRequest),
      mergeMap(({ requestId }) =>
        this.dashboardService.cancelCollectionRequest(requestId).pipe(
          map(() => DashboardActions.cancelCollectionRequestSuccess({ requestId })),
          catchError(error => of(DashboardActions.cancelCollectionRequestFailure({ error })))
        )
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

  convertPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.convertPoints),
      mergeMap(({ points }) =>
        this.dashboardService.convertPoints(points).pipe(
          map(voucher => DashboardActions.convertPointsSuccess({ points, voucher })),
          catchError(error => of(DashboardActions.convertPointsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}

