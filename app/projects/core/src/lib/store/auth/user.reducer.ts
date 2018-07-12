import { User } from '../../auth/user';
import { AuthAction, AuthActionTypes } from './auth.action-sets';

export function userReducer(state: User, action: AuthAction): User | null
{
    switch (action.type)
    {
        case AuthActionTypes.UserChanged: {
            if (action.payload)
            {
                return { ...state, ...action.payload };
            }
            return null;
        }

        default:
            return state;
    }
}
