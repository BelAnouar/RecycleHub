import { createReducer, on } from '@ngrx/store';
import * as CollectionActions from './collection.actions';
import { CollectionRequest } from '../models/collection-request.model';

export interface CollectionState {
  requests: CollectionRequest[];
  loading: boolean;
  error: any;
}

export const initialState: CollectionState = {
  requests: [],
  loading: false,
  error: null
};

export const collectionReducer = createReducer(
  initialState,
  on(CollectionActions.loadCollectionRequests, state => ({ ...state, loading: true })),
  on(CollectionActions.loadCollectionRequestsSuccess, (state, { requests }) => ({ 
    ...state, 
    requests, 
    loading: false 
  })),
  on(CollectionActions.loadCollectionRequestsFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  })),
  on(CollectionActions.createCollectionRequest, state => ({ ...state, loading: true })),
  on(CollectionActions.createCollectionRequestSuccess, (state, { request }) => ({ 
    ...state, 
    requests: [...state.requests, request], 
    loading: false 
  })),
  on(CollectionActions.createCollectionRequestFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  })),
  on(CollectionActions.updateCollectionRequest, state => ({ ...state, loading: true })),
  on(CollectionActions.updateCollectionRequestSuccess, (state, { request }) => ({
    ...state,
    requests: state.requests.map(r => r.id === request.id ? request : r),
    loading: false
  })),
  on(CollectionActions.updateCollectionRequestFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  }))
);