import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
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
  declarations: [SharedComponent],
  exports: [materialModules, SharedComponent]
})
export class SharedModule { }
