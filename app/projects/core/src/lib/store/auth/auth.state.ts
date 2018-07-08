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
    user?: User | null;
}

export const authReducers: ActionReducerMap<AuthFeatureState> = {
    user: userReducer
};

export const authInitialState: AuthFeatureState = {};
