import { User } from '../../auth/user';
import { AuthAction, AuthActionTypes } from './auth.action-sets';

export function userReducer(state: User, action: AuthAction): User
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
