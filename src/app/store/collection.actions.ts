import { createAction, props } from '@ngrx/store';
import { CollectionRequest } from '../models/collection-request.model';

export const loadCollectionRequests = createAction('[Collection] Load Collection Requests');
export const loadCollectionRequestsSuccess = createAction(
  '[Collection] Load Collection Requests Success',
  props<{ requests: CollectionRequest[] }>()
);
export const loadCollectionRequestsFailure = createAction(
  '[Collection] Load Collection Requests Failure',
  props<{ error: any }>()
);

export const createCollectionRequest = createAction(
  '[Collection] Create Collection Request',
  props<{ request: CollectionRequest }>()
);
export const createCollectionRequestSuccess = createAction(
  '[Collection] Create Collection Request Success',
  props<{ request: CollectionRequest }>()
);
export const createCollectionRequestFailure = createAction(
  '[Collection] Create Collection Request Failure',
  props<{ error: any }>()
);

export const updateCollectionRequest = createAction(
  '[Collection] Update Collection Request',
  props<{ request: CollectionRequest }>()
);
export const updateCollectionRequestSuccess = createAction(
  '[Collection] Update Collection Request Success',
  props<{ request: CollectionRequest }>()
);
export const updateCollectionRequestFailure = createAction(
  '[Collection] Update Collection Request Failure',
  props<{ error: any }>()
);