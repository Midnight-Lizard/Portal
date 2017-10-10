import { ExternalModule } from "../../external/external.module";
import { User } from "oidc-client";
import { ActionFakeTypes, Action } from "./app.action-sets";


export interface ActionError 
{
    readonly errorMessage?: string,
    readonly originalError: any,
    readonly source: ActionFakeTypes | Action
};

export interface AppState
{
    user?: User,
    returnUrl: string,
    externalModuleScripts: {
        moduleName: ExternalModule,
        script: string
    }[]
}

export interface RootState
{
    ML: AppState
}

export const initialState: RootState = { ML: { externalModuleScripts: [], returnUrl: "/" } };

export function loadInitialState(): RootState
{
    if (typeof document === "object")
    {
        const mlState = document.querySelector("ml-state");
        if (mlState)
        {
            return JSON.parse(mlState.textContent!);
        }
    }
    return initialState;
}