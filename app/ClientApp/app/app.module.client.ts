/// <reference path="../shared/environment.ts" />
import { Side } from "../shared/side.service";
import { Settings } from "./models/settings.model";
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppSharedModule } from './app.module.shared';
import { AppComponent } from "./components/app/app.component";

export let imports: any[] = [
    BrowserModule,
    BrowserAnimationsModule,
    AppSharedModule
];

if (ENV !== "prod")
{
    imports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
    bootstrap: [AppComponent],
    imports: imports,
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: 'SIDE', useValue: Side.Client },
        { provide: 'USER', useValue: undefined },
        { provide: Settings, useFactory: getSettings }
    ]
})
export class AppModule
{
}

export function getBaseUrl()
{
    return document.getElementsByTagName('base')[0].href;
}

declare const TRANSFER_CACHE: { settings: Settings };
export function getSettings()
{
    return TRANSFER_CACHE.settings;
}