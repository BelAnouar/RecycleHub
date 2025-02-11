import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromDashboard from './dashboard.reducer';
import * as fromPoints from './points.reducer';
import * as fromCollection from "./collection.reducer"

export interface AppState {
  auth: fromAuth.State;
  dashboard: fromDashboard.DashboardState;
  points: fromPoints.PointsState;
  collection:fromCollection.CollectionState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  dashboard: fromDashboard.reducer,
  points: fromPoints.pointsReducer,
  collection:fromCollection.collectionReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];