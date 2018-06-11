import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './components/app/app.component';
import { routingComponents, AppRoutingModule } from './app.routing.module';
import { SharedModule as PortalSharedModule } from 'shared';
import { CoreModule as PortalCoreModule } from 'core';
import { AppEffects } from './store/app.effects';
import { appReducer } from './store/app.reducer';
import { rootReducers } from './store/app.state';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent, routingComponents,
        UserNavComponent,
        ToolbarComponent,
        HomeComponent,
        FooterComponent
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
