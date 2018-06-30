import { UserState } from './auth.state';
import { AuthAction, AuthActionTypes } from './auth.action-sets';

export function userReducer(state: UserState, action: AuthAction): UserState
{
    switch (action.type)
    {
        case AuthActionTypes.UserChanged: {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
}
