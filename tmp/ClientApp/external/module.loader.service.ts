import "rxjs";
import { Injectable, NgModuleFactoryLoader, NgModuleFactory, Compiler, Type } from '@angular/core';
import { Store } from "@ngrx/store";

import { Settings } from '../app/models/settings.model';
import { SideService, Side } from '../shared/side.service';
import { ExternalModule, ExternalPath } from './external.module';
import { RouterFailModule } from '../loading/router.fail.module';
import { RootState } from "../app/store/app.state";
import * as Act from "../app/store/app.actions";
import { ExternalScriptLoader } from "./script.loader.service";
import { buildUrl } from "../shared/url.helper";


@Injectable()
export class ExternalModuleLoader implements NgModuleFactoryLoader
{
    protected readonly _modulesCache = new Map<ExternalModule, any>();
    protected readonly _modules = {
        [ExternalModule.SchemesModule]: buildUrl(Settings.current.SCHEMES_URL, '/dist/schemes-module')
    }

    constructor(
        protected readonly env: SideService,
        protected readonly compiler: Compiler,
        protected readonly store$: Store<RootState>,
        protected readonly scriptLoader: ExternalScriptLoader) { }

    protected loadExternalModule(moduleName: ExternalModule, side: Side = Side.Client)
    {
        if (this._modulesCache.has(moduleName))
        {
            return Promise.resolve(this._modulesCache.get(moduleName));
        }
        else 
        {
            let moduleCodePromise = Promise.resolve("");
            if (this.env.isClientSide && side === Side.Client)
            {
                moduleCodePromise = this.store$.select(x => x.ML.externalModuleScripts)
                    .map(scripts => scripts.find(s => s.moduleName === moduleName))
                    .map(x => x ? x.script : "").take(1).toPromise();
            }

            const modulePromise = moduleCodePromise
                .then(code => code || this.scriptLoader.load(this.getScriptUrl(moduleName, side)))
                .then(code =>
                {
                    const exports = { default: {} as any };
                    eval(code);
                    return exports.default;
                })
                .then(module => module, error =>
                {
                    console.error(error);
                    return RouterFailModule;
                });
            modulePromise.then(m => this._modulesCache.set(moduleName, m));
            return modulePromise;
        }
    }

    load(modulePath: ExternalPath): Promise<NgModuleFactory<any>>
    {
        const moduleName = ExternalModule[modulePath.split("#").pop() as keyof typeof ExternalModule];
        let sides = [this.loadExternalModule(moduleName, this.env.side)];
        if (this.env.isServerSide)
        {
            sides.push(this.scriptLoader.load(this.getScriptUrl(moduleName, Side.Client)));
        }
        return Promise.all(sides).then(([module, script]) =>
        {
            script && this.store$.dispatch(new Act.ExternalModuleScriptDownloded({
                moduleName: moduleName,
                script: script
            }));
            return this.compiler.compileModuleSync(module);
        });
    }

    protected getScriptUrl(moduleName: ExternalModule, side: Side)
    {
        return `${this._modules[moduleName]}-${side}.js`;
    }
}

