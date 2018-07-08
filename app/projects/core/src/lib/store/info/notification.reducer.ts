import { NotificationState } from './info.state';
import { InfoAction, InfoActionTypes } from './info.action-sets';

export function notificationReducer(state: NotificationState, action: InfoAction): NotificationState
{
    switch (action.type)
    {
        case InfoActionTypes.NotifyUser: {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        }

        default:
            return state;
    }
}
