import { SideService, Side } from "../shared/side.service";
import { Settings } from "./models/settings.model";
new SideService(Side.Client);
Settings.initializeClientSideSettings();

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppSharedModule } from './app.module.shared';
import { AppComponent } from "./components/app/app.component";

export let devTools = [];
if (ENV !== "prod")
{
    devTools = [StoreDevtoolsModule.instrument()];
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppSharedModule,
        ...devTools
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: 'SIDE', useValue: Side.Client }
    ]
})
export class AppModule
{
}

export function getBaseUrl()
{
    return document.getElementsByTagName('base')[0].href;
}