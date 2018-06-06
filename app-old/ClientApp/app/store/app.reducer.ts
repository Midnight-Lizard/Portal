import { AppState } from "./app.state";
import { Action, ActionType } from "./app.action-sets";

export function appReducer(state: AppState, action: Action): AppState
{
    switch (action.type)
    {
        case ActionType.RouterNavigated: {
            return { ...state, returnUrl: action.payload.routerState.url }
        }

        case ActionType.ExternalModuleScriptDownloded: {
            const scripts = [...state.externalModuleScripts, action.payload];
            return { ...state, externalModuleScripts: scripts };
        }

        case ActionType.UserSignedIn: {
            return { ...state, ...action.payload }
        }

        case ActionType.SignInFailed: {
            // TODO: process error
            return { ...state, user: undefined }
        }

        case ActionType.UserSignedOut: {
            return { ...state, user: undefined }
        }

        default:
            return state;
    }
}