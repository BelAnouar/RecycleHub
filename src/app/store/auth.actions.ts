import { createAction, props } from "@ngrx/store"
import { User } from "../models/user.model";
import e from "express";

export const login = createAction("[Auth] Login", props<{ email: string; password: string }>())

export const loginSuccess = createAction("[Auth] Login Success", props<{ user: any }>())

export const loginFailure = createAction("[Auth] Login Failure", props<{ error: any }>())

export const register = createAction("[Auth] Register", props<{ name: string; email: string; password: string }>())

export const registerSuccess = createAction("[Auth] Register Success", props<{ user: any }>())

export const registerFailure = createAction("[Auth] Register Failure", props<{ error: any }>())

export const logout = createAction("[Auth] Logout")


export const updateUserProfile = createAction(
    '[Auth] Update User Profile',
    props<{ user: Partial<User> }>()
  );
  
  export const updateUserProfileSuccess = createAction(
    '[Auth] Update User Profile Success',
    props<{ user: User }>()
  );
  
  export const updateUserProfileFailure = createAction(
    '[Auth] Update User Profile Failure',
    props<{ error: any }>()
  );
  
  export const deleteUserAccount = createAction('[Auth] Delete User Account');
  
  export const deleteUserAccountSuccess = createAction('[Auth] Delete User Account Success');
  
  export const deleteUserAccountFailure = createAction(
    '[Auth] Delete User Account Failure',
    props<{ error: any }>()
  );


  export const loadUserProfileInformation = createAction('[Auth] Load User Profile Information');
  export const loadUserProfileInformationSuccess = createAction('[Auth] Load User Profile Information Success', props<{ user: User }>());
    export const loadUserProfileInformationFailure = createAction(
        '[Auth] Load User Profile Information Failure',
        props<{ error: any }>()
    );


    export const updateUserPoints = createAction(

        '[User] Update Points',
      
        props<{ userId: number; points: number }>()
      
      );
      

      export const updateUserPointsSuccess = createAction(
        '[User] Update Points Success',
        props<{ user: any }>()
      );
      
      export const updateUserPointsFailure = createAction(
        '[User] Update Points Failure',
        props<{ error: any }>()
      );