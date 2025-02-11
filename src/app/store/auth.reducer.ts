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

export const authReducer = createReducer(initialState,
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

  on(AuthActions.loadUserProfileInformation, (state) => ({...state, loading: true})),
  on(AuthActions.loadUserProfileInformationSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.loadUserProfileInformationFailure, (state, { error }) => ({...state, error})), 
  on(AuthActions.updateUserProfile, (state) => ({ ...state, loading: true })),
  on(AuthActions.updateUserProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.updateUserProfileFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(AuthActions.deleteUserAccount, (state) => ({ ...state, loading: true })),
  on(AuthActions.deleteUserAccountSuccess, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    loading: false,
  })),
  on(AuthActions.deleteUserAccountFailure, (state, { error }) => ({ ...state, error, loading: false }))
  ,
  on(AuthActions.updateUserPoints, (state) => ({ ...state, loading: true })),
  on(AuthActions.updateUserPointsSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.updateUserPointsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

