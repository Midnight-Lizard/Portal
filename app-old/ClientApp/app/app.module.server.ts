import { Side } from "../shared/side.service";
import { ObservableMedia } from "@angular/flex-layout";
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { Subject } from "rxjs/Subject";
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppSharedModule } from './app.module.shared';
import { AppComponent } from "./components/app/app.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        ServerModule,
        AppSharedModule,
        NoopAnimationsModule,
        FlexLayoutServerModule
    ],
    providers: [
        { provide: ObservableMedia, useClass: Subject },
        //{ provide: 'BASE_URL', useValue: "http://localhost:80" },
        { provide: 'SIDE', useValue: Side.Server }
    ]
})
export class AppModule { }