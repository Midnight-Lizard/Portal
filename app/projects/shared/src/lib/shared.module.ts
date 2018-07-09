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
    MatCardModule, MatBadgeModule, MatIconRegistry, MatSnackBarModule,
    MatBottomSheetModule
} from '@angular/material';

import { SharedComponent } from './shared.component';

const materialModules = [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule,
    MatTooltipModule, MatProgressSpinnerModule, MatPaginatorModule,
    MatSortModule, MatButtonToggleModule, MatGridListModule,
    MatCardModule, MatBadgeModule, MatSnackBarModule, MatBottomSheetModule
];

const svgIcons = [
    { key: 'midnight-lizard', path: 'assets/ml-logo.svg' },
    { key: 'outline-thumb-up', path: 'assets/outline-thumb_up.svg' },
    { key: 'mark-as-read', path: 'assets/mark-as-read.svg' }
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
        for (const icon of svgIcons)
        {
            iconRegistry.addSvgIcon(
                icon.key,
                sanitizer.bypassSecurityTrustResourceUrl(icon.path));
        }
    }
}
