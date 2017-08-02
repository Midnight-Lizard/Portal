import { NgModule, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompilerConfig } from "@angular/compiler";

import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { ModuleLoaderService, ExternalModule } from './services/module.loader.service';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FormsModule } from "@angular/forms";
import { MaterialControlsModule } from "./modules/material.module";
import { HttpModule } from '@angular/http';
import { SideService } from "./services/side.service";
import { LoadingModule } from "./modules/loading.module";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";

export function getSharedConfig(loader: ModuleLoaderService): NgModule
{
    return {
        bootstrap: [AppComponent],
        declarations: [
            AppComponent,
            HomeComponent,
            ToolbarComponent,
            FooterComponent,
            CounterComponent,
            FetchDataComponent
        ],
        imports: [
            MaterialControlsModule,
            FormsModule,
            HttpModule,
            RouterModule.forRoot([
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: HomeComponent },
                { path: 'docs', component: CounterComponent },
                { path: 'issues', component: FetchDataComponent },
                { path: 'schemes', loadChildren: loader.load(ExternalModule.SchemesModule) },
                { path: '**', redirectTo: 'home' }
            ]),
            LoadingModule
        ],
        providers: [SideService,
            {
                provide: CompilerConfig,
                useValue: new CompilerConfig({
                    defaultEncapsulation: ViewEncapsulation.None
                })
            }]
    }
}
