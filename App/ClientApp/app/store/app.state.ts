import { ExternalModule } from "../../external/external.module";

export interface AppState
{
    externalModuleScripts: {
        moduleName: ExternalModule,
        script: string
    }[]
}

export interface RootState
{
    ML: AppState
}

export const initialState: RootState = { ML: { externalModuleScripts: [] } };

export function loadInitialState(): RootState
{
    if (typeof document === "object")
    {
        const mlState = document.querySelector("ml-state");
        if (mlState)
        {
            return JSON.parse(mlState.textContent);
        }
        else return initialState;
    }
    else return initialState;
}