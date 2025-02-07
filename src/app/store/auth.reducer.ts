import { createReducer, on } from "@ngrx/store"
import * as AuthActions from "./auth.actions"

export const authFeatureKey = "auth"

export interface State {
  user: any | null
  error: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const initialState: State = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
}

export const reducer = createReducer(initialState,
  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    loading: false,
  })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  })),
)

