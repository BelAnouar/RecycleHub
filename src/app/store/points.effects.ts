import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PointsActions from './points.actions';
import { PointsService } from '../services/points.service';
import { IndexDBService } from '../services/indexdb.service';
import { UserService } from '../services/user.service';

@Injectable()
export class PointsEffects {
  loadPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PointsActions.loadPoints),
      mergeMap(() =>
        this.userService.currentUser.pipe(
          mergeMap((user) => {
            if (user && user.id) {
              return this.indexDBService.getUserById(user.id).then((userData) => {
                if (userData) {
                  return PointsActions.loadPointsSuccess({ points: userData.points || 0 });
                } else {
                  throw new Error('User data not found');
                }
              });
            } else {
              throw new Error('User not authenticated');
            }
          })
        )
      ),
      catchError((error) => of(PointsActions.loadPointsFailure({ error })))
    )
  );


  addPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PointsActions.addPoints),
      mergeMap(({ points }) =>
        this.pointsService.addPoints(points).pipe(
          map(() => PointsActions.addPointsSuccess({ points })),
          catchError(error => of(PointsActions.addPointsFailure({ error })))
        )
      )
    )
  );

  convertPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PointsActions.convertPoints),
      mergeMap(({ points, userPoints }) =>
        this.pointsService.convertPoints(points, userPoints).pipe(
          map(() => PointsActions.convertPointsSuccess({ points })),
          catchError(error => of(PointsActions.convertPointsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pointsService: PointsService,
    private userService: UserService,
    private indexDBService: IndexDBService
  ) {}
}