import { NgModuleRef, ApplicationRef, StaticProvider } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';
import { authInitialState, defaultSettings } from 'core';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) =>
{
    let ngModule: NgModuleRef<any>;
    module.hot.accept();
    setHmrDefaults();
    bootstrap().then(mod => ngModule = mod);
    module.hot.dispose(() =>
    {
        const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        const elements = appRef.components.map(c => c.location.nativeElement);
        const makeVisible = createNewHosts(elements);
        ngModule.destroy();
        makeVisible();
    });
};

export function setHmrDefaults()
{
    authInitialState.user = {
        access_token: '53690129ca22e5671dac0c79b4f8dc50527bbc893f8f7dc3424f5b2bc49e47a1',
        expired: false,
        claims: {
            name: 'hmr',
            preferred_username: 'hmr',
            sub: 'none',
            profile: 'none'
        }
    };

    authInitialState.system = {
        access_token: 'fbb8163ec7f2ae6700e91fca03e811834fb14e07f3f0ebd074f87290cce1f838'
    };

    (defaultSettings as any).SCHEMES_QUERIER_URL = 'http://192.168.1.44:31005';
}

