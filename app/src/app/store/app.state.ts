import { User } from 'oidc-client';
import { ActionFakeTypes, Action } from './app.action-sets';


export const AppFeature: keyof RootState = 'ML';

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

export const initialState: RootState = { ML: { returnUrl: '/' } };

export function loadInitialState(): RootState
{
    if (typeof document === 'object')
    {
        const mlState = document.querySelector('ml-state');
        if (mlState && mlState.textContent)
        {
            return JSON.parse(mlState.textContent);
        }
    }
    return initialState;
}
