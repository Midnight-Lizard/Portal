import { NgModule } from '@angular/core';
import { RouterFailModule } from '../loading/router.fail.module';


export enum ExternalModule
{
    SchemesModule = "schemes"
};

export enum ExternalPath
{
    SchemesModule = "../external/external.module#SchemesModule"
}


@NgModule({
    imports: [RouterFailModule]
})
export class SchemesModule { }