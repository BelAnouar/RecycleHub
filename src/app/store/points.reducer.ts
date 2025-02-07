import { createReducer, on } from "@ngrx/store"
import * as PointsActions from "./points.actions"

export interface PointsState {
  points: number
}

export const initialState: PointsState = {
  points: 0,
}

export const pointsReducer = createReducer(
  initialState,
  on(PointsActions.setPoints, (state, { points }) => ({ ...state, points })),
  on(PointsActions.addPoints, (state, { points }) => ({ ...state, points: state.points + points })),
  on(PointsActions.subtractPoints, (state, { points }) => ({ ...state, points: Math.max(0, state.points - points) })),
)

