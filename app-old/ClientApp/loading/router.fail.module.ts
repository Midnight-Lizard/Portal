import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingFailComponent } from "./loading.fail.component";
import { MatIconModule, MatButtonModule } from "@angular/material";

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