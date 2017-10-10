import 'reflect-metadata';
import 'zone.js';
import 'rxjs/add/operator/first';
import { enableProdMode, ApplicationRef, NgZone, ValueProvider } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { platformDynamicServer, PlatformState, INITIAL_CONFIG } from '@angular/platform-server';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { AppModule } from './app/app.module.server';

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

    return platformDynamicServer(providers).bootstrapModule(AppModule).then(moduleRef =>
    {
        const appRef = moduleRef.injector.get(ApplicationRef);
        const state = moduleRef.injector.get(PlatformState);
        const zone = moduleRef.injector.get(NgZone) as NgZone;

        return new Promise<RenderResult>((resolve, reject) =>
        {
            zone.onError.subscribe((errorInfo: any) => reject(errorInfo));
            appRef.isStable.first((isStable: any) => isStable).subscribe(() =>
            {
                // Because 'onStable' fires before 'onError', we have to delay slightly before
                // completing the request in case there's an error to report
                setImmediate(() =>
                {
                    resolve({
                        html: state.renderToString()
                    });
                    moduleRef.destroy();
                });
            });
        });
    });
});
