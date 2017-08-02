﻿import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../components/loading/loading.component';
import { MdProgressSpinnerModule } from "@angular/material";

@NgModule({
    declarations: [
        LoadingComponent
    ],
    imports: [
        MdProgressSpinnerModule,
    ],
    exports: [
        LoadingComponent
    ]
})
export class LoadingModule { }