import { createFeatureSelector, createSelector } from "@ngrx/store"
import type { PointsState } from "./points.reducer"

export const selectPointsState = createFeatureSelector<PointsState>("points")

export const selectPoints = createSelector(selectPointsState, (state: PointsState) => state.points)

