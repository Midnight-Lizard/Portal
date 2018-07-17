import { NotificationState } from './info.state';
import { InfoAction, InfoActionTypes } from './info.action-sets';

export function notificationReducer(state: NotificationState, action: InfoAction): NotificationState
{
    switch (action.type)
    {
        case InfoActionTypes.NotifyUser: {
            const newMessage = {
                id: action.payload.id || (state.messages && state.messages.length ? state.messages[0].id! + 1 : 0),
                ...action.payload
            };
            return {
                ...state,
                messages: [newMessage, ...state.messages],
                lastMessage: newMessage
            };
        }

        case InfoActionTypes.DismissAllNotifications: {
            return { ...state, messages: [], lastMessage: undefined };
        }

        case InfoActionTypes.DismissNotification: {
            const messages = state.messages && state.messages.length
                ? state.messages.filter(msg => msg.id !== action.payload.id)
                : [];
            return {
                ...state, messages, lastMessage:
                    state.lastMessage && state.lastMessage.id === action.payload.id
                        ? undefined : state.lastMessage
            };
        }

        default:
            return state;
    }
}
