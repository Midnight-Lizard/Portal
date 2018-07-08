import { NavState } from './nav.state';
import { NavAction, NavActionTypes } from './nav.action-sets';

export function navReducer(state: NavState, action: NavAction): NavState
{
    switch (action.type)
    {
        case NavActionTypes.ReturnUrlChanged: {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
}
