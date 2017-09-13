import { ExternalModule } from "../../external/external.module";

export namespace Actions
{
    export class ExternalModuleScriptDownloded
    {
        readonly type = "ExternalModuleScriptDownloded";
        constructor(readonly payload: {
            moduleName: ExternalModule,
            script: string
        }) { }
    }
}