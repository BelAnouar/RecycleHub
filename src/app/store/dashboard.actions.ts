import { createAction, props } from "@ngrx/store"
import type { CollectionRequest } from "../models/collection-request.model"

export const loadCollectionRequests = createAction("[Dashboard] Load Collection Requests")
export const loadCollectionRequestsSuccess = createAction(
  "[Dashboard] Load Collection Requests Success",
  props<{ requests: CollectionRequest[] }>(),
)
export const loadCollectionRequestsFailure = createAction(
  "[Dashboard] Load Collection Requests Failure",
  props<{ error: any }>(),
)

export const createCollectionRequest = createAction(
  "[Dashboard] Create Collection Request",
  props<{ request: CollectionRequest }>(),
)
export const createCollectionRequestSuccess = createAction(
  "[Dashboard] Create Collection Request Success",
  props<{ request: CollectionRequest }>(),
)
export const createCollectionRequestFailure = createAction(
  "[Dashboard] Create Collection Request Failure",
  props<{ error: any }>(),
)

export const cancelCollectionRequest = createAction(
  "[Dashboard] Cancel Collection Request",
  props<{ requestId: number }>(),
)
export const cancelCollectionRequestSuccess = createAction(
  "[Dashboard] Cancel Collection Request Success",
  props<{ requestId: number }>(),
)
export const cancelCollectionRequestFailure = createAction(
  "[Dashboard] Cancel Collection Request Failure",
  props<{ error: any }>(),
)

export const loadUserPoints = createAction("[Dashboard] Load User Points")
export const loadUserPointsSuccess = createAction("[Dashboard] Load User Points Success", props<{ points: number }>())
export const loadUserPointsFailure = createAction("[Dashboard] Load User Points Failure", props<{ error: any }>())

export const convertPoints = createAction("[Dashboard] Convert Points", props<{ points: number }>())
export const convertPointsSuccess = createAction(
  "[Dashboard] Convert Points Success",
  props<{ points: number; voucher: number }>(),
)
export const convertPointsFailure = createAction("[Dashboard] Convert Points Failure", props<{ error: any }>())

