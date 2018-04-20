import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading.component';
import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
    declarations: [
        LoadingComponent
    ],
    imports: [
        MatProgressSpinnerModule,
    ],
    exports: [
        LoadingComponent
    ]
})
export class LoadingModule { }