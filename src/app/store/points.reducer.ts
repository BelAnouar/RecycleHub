import { createReducer, on } from '@ngrx/store';
import * as PointsActions from './points.actions';

export interface PointsState {
  points: number;
  loading: boolean;
  error: any;
}

export const initialState: PointsState = {
  points: 0,
  loading: false,
  error: null
};

export const pointsReducer = createReducer(
  initialState,
  on(PointsActions.loadPoints, state => ({ ...state, loading: true })),
  on(PointsActions.loadPointsSuccess, (state, { points }) => ({ ...state, points, loading: false })),
  on(PointsActions.loadPointsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(PointsActions.addPoints, state => ({ ...state, loading: true })),
  on(PointsActions.addPointsSuccess, (state, { points }) => ({ ...state, points: state.points + points, loading: false })),
  on(PointsActions.addPointsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(PointsActions.convertPoints, state => ({ ...state, loading: true })),
  on(PointsActions.convertPointsSuccess, (state, { points }) => ({ ...state, points: state.points - points, loading: false })),
  on(PointsActions.convertPointsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);