import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingFailComponent } from "../components/loading/loading.fail.component";
import { MdIconModule, MdButtonModule } from "@angular/material";

@NgModule({
    declarations: [LoadingFailComponent],
    imports: [
        MdIconModule, MdButtonModule,
        RouterModule.forChild([
            {
                path: '**', component: LoadingFailComponent
            }])
    ]
})
export class RouterFailModule { }