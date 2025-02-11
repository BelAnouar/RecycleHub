import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { IndexDBService } from '../services/indexdb.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.indexDBService
          .getUserByEmail(action.email)
          .then((user) => {
            if (user && user.password === action.password) {
              this.userservice.setCurrentUser({
                ...user,
                address: '',
                phone: '',
                birthDate: new Date(),
              });
              const { password, ...userWithoutPassword } = user;
              return AuthActions.loginSuccess({ user: userWithoutPassword });
            } else {
              throw new Error('Invalid email or password');
            }
          })
          .catch((error) => AuthActions.loginFailure({ error: error.message }))
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this.indexDBService
          .addUser({
            name: action.name,
            email: action.email,
            password: action.password,
            role: 'user',
          })
          .then((id) => {
            const newUser = {
              id,
              name: action.name,
              email: action.email,
              role: 'user' as const,
            };
            return AuthActions.registerSuccess({ user: newUser });
          })
          .catch((error) =>
            AuthActions.registerFailure({ error: error.message })
          )
      )
    )
  );

  loadUserProfileInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserProfileInformation),
      mergeMap((action) =>
        this.userservice.currentUser.pipe(
          map((user) => {
            if (user) {
              return AuthActions.loadUserProfileInformationSuccess({ user });
            } else {
              throw new Error('User not found');
            }
          })
        )
      )
    )
  );


  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserProfile),
      mergeMap(action =>
        this.userservice.updateUserProfile(action.user).pipe(
          map(user => {
            if (user) {
              return AuthActions.updateUserProfileSuccess({ user });
            } else {
              throw new Error('User not found');
            }
          }),
          catchError(error => of(AuthActions.updateUserProfileFailure({ error })))
        )
      )
    )
  );

  deleteUserAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteUserAccount),
      mergeMap(() =>
        this.userservice.deleteUserAccount().pipe(
          map(() => AuthActions.deleteUserAccountSuccess()),
          catchError(error => of(AuthActions.deleteUserAccountFailure({ error })))
        )
      )
    )
  );

  
  updateUserPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserPoints),
      mergeMap((action) =>
        this.indexDBService.getUserById(action.userId).then((user) => {
          if (user) {
            const updatedUser = {
              ...user,
              points: (user.points || 0) + action.points,
            };
            return this.indexDBService.updateUser(updatedUser).then(() => {
              return AuthActions.updateUserPointsSuccess({ user: updatedUser });
            });
          } else {
            throw new Error('User not found');
          }
        })
      ),
      catchError((error) => of(AuthActions.updateUserPointsFailure({ error })))
    )
  );
  constructor(
    private actions$: Actions,
    private indexDBService: IndexDBService,
    private userservice: UserService
  ) {}
}
