import 'reflect-metadata';
import 'zone.js';
import 'rxjs/add/operator/first';
import { enableProdMode, ApplicationRef, NgZone, ValueProvider } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { platformDynamicServer, PlatformState, INITIAL_CONFIG } from '@angular/platform-server';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from '@nguniversal/aspnetcore-engine';

import { AppModule } from './app/app.module.server';
import { Settings } from './app/models/settings.model';

enableProdMode();

export default createServerRenderer(params =>
{
    console.log(params);
    const providers = [
        { provide: INITIAL_CONFIG, useValue: { document: '<ml-app></ml-app>', url: params.url } },
        { provide: APP_BASE_HREF, useValue: params.baseUrl },
        { provide: 'BASE_URL', useValue: params.origin + params.baseUrl },
        { provide: 'USER', useValue: params.data.user }
    ];

    // Platform-server provider configuration
    const setupOptions: IEngineOptions = {
        appSelector: '<ml-app></ml-app>',
        ngModule: AppModule,
        request: params,
        providers: [
            { provide: 'BASE_URL', useValue: params.origin + params.baseUrl },
            { provide: 'USER', useValue: params.data.user },
            { provide: Settings, useValue: params.data.settings }
        ]
    };

    return ngAspnetCoreEngine(setupOptions).then(response =>
    {
        // Apply your transferData to response.globals
        response.globals.transferData = createTransferScript({
            settings: params.data.settings // example of data coming from dotnet, in HomeController
        });

        return ({
            html: response.html, // our <app-root> serialized
            globals: response.globals // all of our styles/scripts/meta-tags/link-tags for aspnet to serve up
        });
    });

    // return platformDynamicServer(providers).bootstrapModule(AppModule).then(moduleRef =>
    // {
    //     const appRef = moduleRef.injector.get(ApplicationRef);
    //     const state = moduleRef.injector.get(PlatformState);
    //     const zone = moduleRef.injector.get(NgZone) as NgZone;

    //     return new Promise<RenderResult>((resolve, reject) =>
    //     {
    //         zone.onError.subscribe((errorInfo: any) => reject(errorInfo));
    //         appRef.isStable.first((isStable: any) => isStable).subscribe(() =>
    //         {
    //             // Because 'onStable' fires before 'onError', we have to delay slightly before
    //             // completing the request in case there's an error to report
    //             setImmediate(() =>
    //             {
    //                 resolve({
    //                     html: state.renderToString()
    //                 });
    //                 moduleRef.destroy();
    //             });
    //         });
    //     });
    // });
});
