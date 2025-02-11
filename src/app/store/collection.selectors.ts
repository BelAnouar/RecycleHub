import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionState } from './collection.reducer';

export const selectCollectionState = createFeatureSelector<CollectionState>('collection');

export const selectCollectionRequests = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.requests
);

export const selectCollectionLoading = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.loading
);

export const selectCollectionError = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.error
);