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
        access_token: '28df85a6b299fcadb31462d00a0fe31859bdb7dc82c9d85f2010ec4fd737b584',
        expired: false,
        claims: {
            name: 'hmr',
            preferred_username: 'hmr',
            sub: 'none',
            profile: 'none'
        }
    };

    authInitialState.system = {
        access_token: '85beee84dfd82f20885023b6872d8a07db314b6e3f9be775f366c08b608f18ab'
    };

    (defaultSettings as any).SCHEMES_QUERIER_URL = 'http://192.168.1.44:31005';
}

