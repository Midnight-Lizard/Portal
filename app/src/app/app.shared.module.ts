import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './components/app/app.component';
import { routingComponents, AppRoutingModule } from './app.routing.module';
import { MaterialControlsModule } from '../shared/material.module';

@NgModule({
    declarations: [
        AppComponent, ...routingComponents
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'portal' }),
        AppRoutingModule, MaterialControlsModule,
        FormsModule, ReactiveFormsModule, FlexLayoutModule,
        HttpClientModule,
    ],
    providers: []
})
export class AppSharedModule { }
