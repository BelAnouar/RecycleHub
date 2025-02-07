import { createReducer, on } from "@ngrx/store"
import * as DashboardActions from "./dashboard.actions"
import type { CollectionRequest } from "../models/collection-request.model"

export const dashboardFeatureKey = "dashboard"

export interface DashboardState {
  collectionRequests: CollectionRequest[]
  userPoints: number
  loading: boolean
  error: any
}

export const initialState: DashboardState = {
  collectionRequests: [],
  userPoints: 0,
  loading: false,
  error: null,
}

export const reducer = createReducer(
  initialState,

  on(DashboardActions.loadCollectionRequests, (state) => ({ ...state, loading: true })),
  on(DashboardActions.loadCollectionRequestsSuccess, (state, { requests }) => ({
    ...state,
    collectionRequests: requests,
    loading: false,
  })),
  on(DashboardActions.loadCollectionRequestsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(DashboardActions.createCollectionRequest, (state) => ({ ...state, loading: true })),
  on(DashboardActions.createCollectionRequestSuccess, (state, { request }) => ({
    ...state,
    collectionRequests: [...state.collectionRequests, request],
    loading: false,
  })),
  on(DashboardActions.createCollectionRequestFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(DashboardActions.cancelCollectionRequest, (state) => ({ ...state, loading: true })),
  on(DashboardActions.cancelCollectionRequestSuccess, (state, { requestId }) => ({
    ...state,
    collectionRequests: state.collectionRequests.filter((request) => request.id !== requestId),
    loading: false,
  })),
  on(DashboardActions.cancelCollectionRequestFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(DashboardActions.loadUserPoints, (state) => ({ ...state, loading: true })),
  on(DashboardActions.loadUserPointsSuccess, (state, { points }) => ({ ...state, userPoints: points, loading: false })),
  on(DashboardActions.loadUserPointsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(DashboardActions.convertPoints, (state) => ({ ...state, loading: true })),
  on(DashboardActions.convertPointsSuccess, (state, { points }) => ({
    ...state,
    userPoints: state.userPoints - points,
    loading: false,
  })),
  on(DashboardActions.convertPointsFailure, (state, { error }) => ({ ...state, error, loading: false })),
)

