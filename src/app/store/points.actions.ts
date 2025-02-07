import { createAction, props } from "@ngrx/store"

export const setPoints = createAction("[Points] Set Points", props<{ points: number }>())
export const addPoints = createAction("[Points] Add Points", props<{ points: number }>())
export const subtractPoints = createAction("[Points] Subtract Points", props<{ points: number }>())

