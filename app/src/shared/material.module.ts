import { NgModule } from '@angular/core';
import
{
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule,
    MatProgressSpinnerModule, MatPaginatorModule, MatSortModule
} from '@angular/material';

const materialModules = [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule,
    MatProgressSpinnerModule, MatPaginatorModule, MatSortModule
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})
export class MaterialControlsModule
{
}
