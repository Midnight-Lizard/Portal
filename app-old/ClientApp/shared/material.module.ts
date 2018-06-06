import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule,
    MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';
import { CdkTableModule } from "@angular/cdk/table";

@NgModule({
    imports: [
        MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
        MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule,
        MatProgressSpinnerModule, MatTableModule, MatPaginatorModule,
        CdkTableModule, MatSortModule
    ],
    exports: [
        MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
        MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule,
        MatProgressSpinnerModule, MatTableModule, MatPaginatorModule,
        CdkTableModule, MatSortModule
    ]
})
export class MaterialControlsModule {

}