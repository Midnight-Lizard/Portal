import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule } from '@angular/http';
import { StoreModule, Action } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { MaterialControlsModule } from "../shared/material.module";
import { AppFeature, initialState } from "./store/app.state";
import { appReducer } from "./store/app.reducer";
import { RouterLinkStubDirective } from '../test/stubs/router-link.stub';
import { RouterOutletStubComponent } from '../test/stubs/router-outlet.stub';

@NgModule({
    declarations:[
        RouterOutletStubComponent,
        RouterLinkStubDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialControlsModule,
        HttpModule,
        FlexLayoutModule,
        StoreModule.forRoot( { ML: appReducer }, { initialState }),
        EffectsModule.forRoot([])
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialControlsModule,
        HttpModule,
        FlexLayoutModule,
        RouterOutletStubComponent,
        RouterLinkStubDirective
    ]
})
export class AppTestingModule
{
}