import { NotificationState } from './info.state';
import { InfoAction, InfoActionTypes } from './info.action-sets';

export function notificationReducer(state: NotificationState, action: InfoAction): NotificationState
{
    switch (action.type)
    {
        case InfoActionTypes.NotifyUser: {
            const newMessage = {
                id: action.payload.id || state.messages && state.messages.length ? state.messages[0].id! + 1 : 0,
                ...action.payload
            };
            return {
                ...state,
                messages: [newMessage, ...state.messages]
            };
        }

        case InfoActionTypes.DismissAllNotifications: {
            return { ...state, messages: [] };
        }

        case InfoActionTypes.DismissNotification: {
            const messages = state.messages && state.messages.length
                ? state.messages.filter(msg => msg.id !== action.payload.id)
                : [];
            return { ...state, messages };
        }

        default:
            return state;
    }
}
