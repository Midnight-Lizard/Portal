import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
// import { PrebootModule } from 'preboot';

import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { StateComponent } from "./components/state/state.component";
import { loadInitialState } from "./store/app.state";
import { appReducer } from "./store/app.reducer";
import { MaterialControlsModule } from '../shared/material.module';
import { SideService } from '../shared/side.service';
import { ExternalPath, ExternalModule } from '../external/external.module';
import { ExternalModuleLoader } from '../external/module.loader.service';
import { LoadingModule } from '../loading/loading.module';
import { Settings } from './models/settings.model';
import { ExternalScriptLoader } from '../external/script.loader.service';
import { AppEffects } from './store/app.effects';
import { AuthenticationService } from './security/authentication.service';
import { LoadingComponent } from '../loading/loading.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { CommanderComponent } from './components/commander/commander.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ToolbarComponent,
        FooterComponent,
        CounterComponent,
        CommanderComponent,
        FetchDataComponent,
        StateComponent,
        UserNavComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialControlsModule,
        FormsModule, ReactiveFormsModule,
        HttpModule,
        LoadingModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'docs', component: CounterComponent },
            { path: 'api', component: CommanderComponent },
            { path: 'issues', component: FetchDataComponent },
            { path: 'signin', component: LoadingComponent },
            { path: 'silentin', component: LoadingComponent },
            { path: 'signedin', component: LoadingComponent },
            { path: 'signout', component: LoadingComponent },
            { path: 'signout-callback-oidc', component: LoadingComponent },
            { path: 'signedout', component: LoadingComponent },
            { path: 'profile', component: LoadingComponent },
            {
                path: ExternalModule.SchemesModule,
                loadChildren: ExternalPath.SchemesModule
            },
            { path: '**', redirectTo: 'home' }
        ]),
        StoreRouterConnectingModule,
        StoreModule.forRoot({ ML: appReducer }, { initialState: loadInitialState }),
        EffectsModule.forRoot([AppEffects]),
        BrowserModule.withServerTransition({ appId: 'ml' }),
        // PrebootModule.withConfig({ appRoot: 'ml-app' }) -> works weird
    ],
    providers: [
        SideService, ExternalScriptLoader, AuthenticationService,
        { provide: NgModuleFactoryLoader, useClass: ExternalModuleLoader }
    ]
})
export class AppSharedModule { }