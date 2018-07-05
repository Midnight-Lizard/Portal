import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import
{
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule,
    MatTooltipModule, MatProgressSpinnerModule, MatPaginatorModule,
    MatSortModule, MatButtonToggleModule, MatGridListModule,
    MatCardModule, MatBadgeModule, MatIconRegistry
} from '@angular/material';

import { SharedComponent } from './shared.component';

const materialModules = [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule,
    MatTooltipModule, MatProgressSpinnerModule, MatPaginatorModule,
    MatSortModule, MatButtonToggleModule, MatGridListModule,
    MatCardModule, MatBadgeModule
];

@NgModule({
    imports: [
        materialModules,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ],
    declarations: [SharedComponent],
    exports: [materialModules, SharedComponent]
})
export class SharedModule
{
    constructor(sanitizer: DomSanitizer, iconRegistry: MatIconRegistry)
    {
        iconRegistry.addSvgIcon(
            'outline-thumb-up',
            sanitizer.bypassSecurityTrustResourceUrl('assets/outline-thumb_up.svg'));
    }
}
