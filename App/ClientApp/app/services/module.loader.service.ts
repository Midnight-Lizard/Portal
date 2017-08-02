//import fetch from 'node-fetch';
import { Injectable } from '@angular/core';
import { SideService, Side } from "./side.service";
import { AppComponent } from "../components/app/app.component";
import { RouterLoadingModule } from "../modules/router.loading.module";
import { RouterFailModule } from "../modules/router.fail.module";

export enum ExternalModule
{
    SchemesModule
}

@Injectable()
export class ModuleLoaderService
{
    protected readonly _modules = new Map<ExternalModule, string>([
        [ExternalModule.SchemesModule, "http://localhost:7001/dist/schemes-module.js"]
    ]);

    public constructor(protected readonly execute: SideService)
    {
    }

    public load(moduleId: ExternalModule)
    {
        const result =
            this.execute.on(Side.Server, () =>
                () => RouterLoadingModule)
            ||
            this.execute.on(Side.Client, () =>
                () => fetch(this._modules.get(moduleId), { mode: 'cors' })
                    .then(resp => resp.text())
                    .then(code =>
                    {
                        const exports = { default: {} };
                        eval(code);
                        return exports.default;
                    })
                    .then(module => module, error =>
                    {
                        console.error(error);
                        return RouterFailModule;
                    }));
        return result;
    }
}