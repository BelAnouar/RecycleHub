import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<fromDashboard.DashboardState>(
  fromDashboard.dashboardFeatureKey
);

export const selectAllCollectionRequests = createSelector(
  selectDashboardState,
  (state) => state.collectionRequests
);

export const selectUserPoints = createSelector(
  selectDashboardState,
  (state) => state.userPoints
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.loading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error
);