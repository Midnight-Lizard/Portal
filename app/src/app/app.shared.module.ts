import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './components/app/app.component';
import { routingComponents, AppRoutingModule } from './app.routing.module';
import { SharedModule as PortalSharedModule } from 'shared';
import { CoreModule as PortalCoreModule } from 'core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { appReducer } from './store/app.reducer';
import { rootReducers } from './store/app.state';

@NgModule({
    declarations: [
        AppComponent, ...routingComponents
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'portal' }),
        AppRoutingModule, PortalSharedModule, PortalCoreModule,
        FormsModule, ReactiveFormsModule, FlexLayoutModule,
        HttpClientModule,
        StoreRouterConnectingModule,
        StoreModule.forRoot(rootReducers),
        EffectsModule.forRoot([AppEffects]),
    ],
    providers: []
})
export class AppSharedModule { }
