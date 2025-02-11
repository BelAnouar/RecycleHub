import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CollectionActions from './collection.actions';
import { CollectionService } from '../services/collection.service';
import { IndexDBService } from '../services/indexdb.service';
import { log } from 'console';

@Injectable()
export class CollectionEffects {
  loadCollectionRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionActions.loadCollectionRequests),
      mergeMap(() =>
        this.collectionService.getCollections().pipe(
          map(requests => CollectionActions.loadCollectionRequestsSuccess({ requests })),
          catchError(error => of(CollectionActions.loadCollectionRequestsFailure({ error })))
        )
      )
    )
  );

  createCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionActions.createCollectionRequest),
      mergeMap(({ request }) =>
       
        
        this.collectionService.createCollection(request).pipe(
          map(createdRequest => CollectionActions.createCollectionRequestSuccess({ request: createdRequest })),
          catchError(error => of(CollectionActions.createCollectionRequestFailure({ error })))
        )
        
      )
    )
  );



  updateCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionActions.updateCollectionRequest),
      mergeMap(({ request }) =>
        this.indexDBService.updateCollection(request).then(() => CollectionActions.updateCollectionRequestSuccess({ request })).catch(error => CollectionActions.updateCollectionRequestFailure({ error })
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private collectionService: CollectionService,
    private indexDBService: IndexDBService
  ) {}
}