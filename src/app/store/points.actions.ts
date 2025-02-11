import { createAction, props } from '@ngrx/store';

export const loadPoints = createAction('[Points] Load Points');
export const loadPointsSuccess = createAction('[Points] Load Points Success', props<{ points: number }>());
export const loadPointsFailure = createAction('[Points] Load Points Failure', props<{ error: any }>());

export const addPoints = createAction('[Points] Add Points', props<{ points: number }>());
export const addPointsSuccess = createAction('[Points] Add Points Success', props<{ points: number }>());
export const addPointsFailure = createAction('[Points] Add Points Failure', props<{ error: any }>());

export const convertPoints = createAction(

    '[Points] Convert Points',
  
    props<{ points: number; userPoints: number }>()
  
  );
export const convertPointsSuccess = createAction('[Points] Convert Points Success', props<{ points: number }>());
export const convertPointsFailure = createAction('[Points] Convert Points Failure', props<{ error: any }>());