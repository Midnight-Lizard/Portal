import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { INITIAL_STATE, Store, select } from '@ngrx/store';
import { TransferState } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { RootState, STORE_STATE_KEY, loadServerInitialState } from './store/app.state';
import { AppComponent } from './components/app/app.component';
import { AppSharedModule } from './app.shared.module';
import { AssetsInterceptor } from './assets-interceptor';

@NgModule({
    imports: [
        ServerModule, ServerTransferStateModule,
        AppSharedModule,
        NoopAnimationsModule,
        FlexLayoutServerModule,
        ModuleMapLoaderModule
    ],
    bootstrap: [AppComponent],
    providers: [{
        provide: INITIAL_STATE,
        useFactory: loadServerInitialState,
        deps: ['USER', 'SYSTEM']
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: AssetsInterceptor,
        multi: true
    }]
})
export class AppServerModule
{
    constructor(
        state: TransferState,
        store$: Store<RootState>)
    {
        store$.pipe(select(x => x))
            .subscribe(store => state.set(STORE_STATE_KEY, store));
    }
}
