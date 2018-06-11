import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';

import { LoadingComponent } from './loading.component';

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
