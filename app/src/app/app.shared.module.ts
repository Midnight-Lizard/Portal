import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: []
})
export class AppSharedModule { }
