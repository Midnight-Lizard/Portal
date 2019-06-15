import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
