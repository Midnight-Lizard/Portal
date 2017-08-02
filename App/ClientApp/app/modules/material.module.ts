import { NgModule } from '@angular/core';
import {
    MdButtonModule, MdCheckboxModule, MdToolbarModule, MdListModule,
    MdSidenavModule, MdIconModule, MdInputModule, MdMenuModule, MdTooltipModule,
    MdProgressSpinnerModule, MdTableModule, MdPaginatorModule, MdSortModule
} from '@angular/material';
import { CdkTableModule } from "@angular/cdk";

@NgModule({
    imports: [
        MdButtonModule, MdCheckboxModule, MdToolbarModule, MdListModule,
        MdSidenavModule, MdIconModule, MdInputModule, MdMenuModule, MdTooltipModule,
        MdProgressSpinnerModule, MdTableModule, MdPaginatorModule,
        CdkTableModule, MdSortModule
    ],
    exports: [
        MdButtonModule, MdCheckboxModule, MdToolbarModule, MdListModule,
        MdSidenavModule, MdIconModule, MdInputModule, MdMenuModule, MdTooltipModule,
        MdProgressSpinnerModule, MdTableModule, MdPaginatorModule,
        CdkTableModule, MdSortModule
    ]
})
export class MaterialControlsModule {

}