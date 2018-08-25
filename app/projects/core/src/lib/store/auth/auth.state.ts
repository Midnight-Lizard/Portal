import { ActionReducerMap } from '@ngrx/store';

import { User } from '../../auth/user';
import { userReducer } from './user.reducer';
import { System } from '../../auth/system';
import { systemReducer } from './system.reducer';

export const AuthFeature: keyof AuthRootState = 'AUTH';

export interface AuthRootState
{
    AUTH: AuthFeatureState;
}

export interface AuthFeatureState
{
    user?: User | null;
    system?: System | null;
}

export const authReducers: ActionReducerMap<AuthFeatureState> = {
    user: userReducer,
    system: systemReducer
};

export const authInitialState: AuthFeatureState = { };
