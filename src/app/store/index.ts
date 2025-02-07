import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromDashboard from './dashboard.reducer';
import * as fromPoints from './points.reducer';

export interface AppState {
  auth: fromAuth.State;
  dashboard: fromDashboard.DashboardState;
  points: fromPoints.PointsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  dashboard: fromDashboard.reducer,
  points: fromPoints.pointsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];