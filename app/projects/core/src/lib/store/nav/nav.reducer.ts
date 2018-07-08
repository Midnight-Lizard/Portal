import { NavState } from './nav.state';
import { NavAction, NavActionTypes } from './nav.action-sets';

export function navReducer(state: NavState, action: NavAction): NavState
{
    switch (action.type)
    {
        case NavActionTypes.RouterNavigation: {
            return { ...state, returnUrl: action.payload.routerState.url };
        }

        default:
            return state;
    }
}
