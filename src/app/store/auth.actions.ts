import { createAction, props } from "@ngrx/store"
import { User } from "../models/user.model";

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