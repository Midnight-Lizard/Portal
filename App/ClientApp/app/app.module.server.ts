import { SideService, Side } from "../shared/side.service";
import { Settings } from "./models/settings.model";
new SideService(Side.Server);
Settings.initializeServerSideSettings();

import { ObservableMedia } from "@angular/flex-layout";
import { Subject } from "rxjs/Subject";
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER, Injector } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppSharedModule } from './app.module.shared';
import { AppComponent } from "./components/app/app.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        ServerModule, AppSharedModule
    ],
    providers: [
        { provide: ObservableMedia, useClass: Subject },
        { provide: 'BASE_URL', useValue: "http://localhost:80" },
        { provide: 'SIDE', useValue: Side.Server }
    ]
})
export class AppModule { }
