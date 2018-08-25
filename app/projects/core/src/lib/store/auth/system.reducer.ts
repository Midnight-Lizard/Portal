import { AuthAction, AuthActionTypes } from './auth.action-sets';
import { System } from '../../auth/system';

export function systemReducer(state: System, action: AuthAction): System | null
{
    switch (action.type)
    {
        case AuthActionTypes.SystemChanged: {
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
