import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';


if (environment.production)
{
    enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppBrowserModule);


if (environment.hmr)
{
    if (module['hot'])
    {
        hmrBootstrap(module, bootstrap);
        console.log('HMR Bootstrap is used');
    }
    else
    {
        console.error('HMR is not enabled for webpack-dev-server!');
    }
}
else
{
    document.addEventListener('DOMContentLoaded',
        () => bootstrap().catch(err => console.log(err)));
}
