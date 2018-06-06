import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

document.addEventListener('DOMContentLoaded', () =>
{
    if (environment.production)
    {
        enableProdMode();
    }

    const bootstrap = () => platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch(err => console.log(err) as any);


    if (environment.hmr)
    {
        if (module['hot'])
        {
            hmrBootstrap(module, bootstrap);
        }
        else
        {
            console.error('HMR is not enabled for webpack-dev-server!');
        }
    }
    else
    {
        bootstrap();
    }
});
