﻿import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../components/loading/loading.component';
import { LoadingModule } from "./loading.module";

@NgModule({
    imports: [
        LoadingModule,
        RouterModule.forChild([
            {
                path: '**', component: LoadingComponent
            }])
    ]
})
export class RouterLoadingModule { }