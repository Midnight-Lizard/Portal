import { NotificationState } from './info.state';
import { InfoAction, InfoActionTypes } from './info.action-sets';

export function notificationReducer(state: NotificationState, action: InfoAction): NotificationState
{
    switch (action.type)
    {
        case InfoActionTypes.NotifyUser: {
            return {
                ...state,
                messages: [action.payload, ...state.messages]
            };
        }

        default:
            return state;
    }
}
