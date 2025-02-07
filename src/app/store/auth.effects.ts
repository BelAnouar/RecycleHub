import { Injectable } from "@angular/core"
import {  Actions, createEffect, ofType } from "@ngrx/effects"
import { mergeMap } from "rxjs/operators"
import * as AuthActions from "./auth.actions"
import  { IndexDBService } from "../services/indexdb.service"

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
              console.log(user)
              const { password, ...userWithoutPassword } = user
              return AuthActions.loginSuccess({ user: userWithoutPassword })
            } else {
              throw new Error("Invalid email or password")
            }
          })
          .catch((error) => AuthActions.loginFailure({ error: error.message })),
      ),
    ),
  )

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this.indexDBService
          .addUser({
            name: action.name,
            email: action.email,
            password: action.password,
            role: "user",
          })
          .then((id) => {
            const newUser = { id, name: action.name, email: action.email, role: "user" as const }
            return AuthActions.registerSuccess({ user: newUser })
          })
          .catch((error) => AuthActions.registerFailure({ error: error.message })),
      ),
    ),
  )

  constructor(
    private actions$: Actions,
    private indexDBService: IndexDBService,
  ) {}
}

