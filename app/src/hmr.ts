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
        access_token: '***',
        expired: false,
        claims: {
            name: 'hmr',
            preferred_username: 'hmr',
            sub: 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
            profile: 'none'
        }
    };

    authInitialState.system = {
        access_token: '***'
    };

    // (defaultSettings as any).SCHEMES_QUERIER_URL = 'http://192.168.1.44:31005';

    (defaultSettings as any).SCHEMES_QUERIER_URL = 'https://midnight-lizard.org/schemes/querier';
    (defaultSettings as any).IMPRESSIONS_COMMANDER_URL = 'https://midnight-lizard.org/impressions/commander';
}

