import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule } from '@angular/material';

import { LoadingFailComponent } from './fail/loading-fail.component';

@NgModule({
    declarations: [LoadingFailComponent],
    imports: [
        MatIconModule, MatButtonModule,
        RouterModule.forChild([
            {
                path: '**', component: LoadingFailComponent
            }])
    ]
})
export class RouterFailModule { }
