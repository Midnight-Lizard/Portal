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

export const navReducers: ActionReducerMap<NavFeatureState> = {
    NAV: navReducer
};

export const navInitialState: NavFeatureState = {
    NAV: {
        returnUrl: '/'
    }
};
