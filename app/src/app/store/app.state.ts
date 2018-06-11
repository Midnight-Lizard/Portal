import { ActionReducerMap } from '@ngrx/store';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { User } from 'core';
import { ActionFakeTypes, Action } from './app.action-sets';
import { appReducer } from './app.reducer';

export interface ActionError
{
    readonly errorMessage?: string;
    readonly originalError: any;
    readonly source: ActionFakeTypes | Action;
}

export interface AppState
{
    user?: User;
    returnUrl: string;
}

export interface RootState
{
    ML: AppState;
}

export const rootReducers: ActionReducerMap<RootState> = {
    ML: appReducer
};

const initialState: RootState = {
    ML: {
        returnUrl: '/'
    }
};
const stateKey = makeStateKey<RootState>('state');
export function loadInitialState(serverState: TransferState): RootState
{
    return serverState.get(stateKey, initialState);
}
