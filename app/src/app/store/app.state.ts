import { Injector, InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { User, AuthRootState, authInitialState, System } from 'core';
import { appReducer } from './app.reducer';

export interface RootState
{
    ML: AppState;
}

// tslint:disable-next-line:no-empty-interface
export interface AppState
{
}

export const rootReducers: ActionReducerMap<RootState> = {
    ML: appReducer
};

export const initialState: RootState & AuthRootState = {
    ML: {},
    AUTH: authInitialState
};
export const STORE_STATE_KEY = makeStateKey<RootState & AuthRootState>('state');
export function loadBrowserInitialState(serverState: TransferState): RootState
{
    return serverState.get(STORE_STATE_KEY, initialState);
}
export function loadServerInitialState(user: User, system: System): RootState
{
    initialState.AUTH = { user, system };
    return initialState;
}
