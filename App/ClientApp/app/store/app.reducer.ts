import { AppState } from "./app.state";
import { Actions as Act } from "./app.actions";

export function appReducer(state: AppState, action: Act.ExternalModuleScriptDownloded): AppState
{
    switch (action.type)
    {
        case "ExternalModuleScriptDownloded": {
            const scripts = [...state.externalModuleScripts, action.payload];
            return { ...state, externalModuleScripts: scripts };
        }

        default:
            return state;
    }
}