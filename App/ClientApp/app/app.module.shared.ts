import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";

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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ToolbarComponent,
        FooterComponent,
        CounterComponent,
        FetchDataComponent,
        StateComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialControlsModule,
        FormsModule,
        HttpModule,
        LoadingModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'docs', component: CounterComponent },
            { path: 'issues', component: FetchDataComponent },
            {
                path: ExternalModule.SchemesModule,
                loadChildren: ExternalPath.SchemesModule
            },
            { path: '**', redirectTo: 'home' }
        ]),
        StoreRouterConnectingModule,
        StoreModule.forRoot({ ML: appReducer }, { initialState: loadInitialState }),
        EffectsModule.forRoot([])
    ],
    providers: [SideService, ExternalScriptLoader,
        { provide: NgModuleFactoryLoader, useClass: ExternalModuleLoader }
    ]
})
export class AppSharedModule { }