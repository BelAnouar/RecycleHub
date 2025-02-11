import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PointsState } from './points.reducer';

export const selectPointsState = createFeatureSelector<PointsState>('points');

export const selectPoints = createSelector(
  selectPointsState,
  (state: PointsState) => state.points
);

export const selectPointsLoading = createSelector(
  selectPointsState,
  (state: PointsState) => state.loading
);

export const selectPointsError = createSelector(
  selectPointsState,
  (state: PointsState) => state.error
);