import { ActionReducerMap } from '@ngrx/store';

import { User } from '../../auth/user';
import { userReducer } from './user.reducer';

export const AuthFeature: keyof AuthRootState = 'AUTH';

export interface AuthRootState
{
    AUTH: AuthFeatureState;
}

export interface AuthFeatureState
{
    USER: UserState;
}

export interface UserState
{
    user?: User | null;
}

export const authReducers: ActionReducerMap<AuthFeatureState> = {
    USER: userReducer
};

export const authInitialState: AuthFeatureState = { USER: {} };
