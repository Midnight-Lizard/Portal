import { ActionReducerMap } from '@ngrx/store';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { User } from '../../auth/user';
import { NavActionTypes as NavActionTypes, NavAction as NavAction } from './nav.action-sets';
import { navReducer } from './nav.reducer';

export const NavFeature: keyof NavRootState = 'NAV';

export interface NavRootState
{
    NAV: NavFeatureState;
}

export interface NavFeatureState
{
    NAV: NavState;
}

export interface NavState
{
    returnUrl: string;
}

export interface ActionError
{
    readonly errorMessage?: string;
    readonly originalError: any;
    readonly source: NavActionTypes | NavAction;
}

export const navReducers: ActionReducerMap<NavFeatureState> = {
    NAV: navReducer
};

export const initialState: NavFeatureState = {
    NAV: {
        returnUrl: '/'
    }
};
