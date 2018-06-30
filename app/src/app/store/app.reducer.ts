import { AppState } from './app.state';
import { AppAction as Action, AppActionTypes as ActionType } from './app.action-sets';
import { ReloadFromServerComponent } from 'shared';

export function appReducer(state: AppState, action: Action): AppState
{
    switch (action.type)
    {
        default:
            return state;
    }
}
