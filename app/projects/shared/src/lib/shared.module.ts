import { NgModule, Inject } from '@angular/core';
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
    MatBottomSheetModule, MatDialogModule
} from '@angular/material';
import { SideService } from 'core';

export const materialModules = [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule,
    MatTooltipModule, MatProgressSpinnerModule, MatPaginatorModule,
    MatSortModule, MatButtonToggleModule, MatGridListModule,
    MatCardModule, MatBadgeModule, MatSnackBarModule, MatBottomSheetModule,
    MatDialogModule
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
    declarations: [],
    exports: [materialModules]
})
export class SharedModule
{
    constructor(
        env: SideService,
        @Inject('ORIGIN_URL')
        baseUrl: string,
        sanitizer: DomSanitizer,
        iconRegistry: MatIconRegistry)
    {
        const pathPrefix = env.isServerSide ? baseUrl : '';
        for (const icon of svgIcons)
        {
            iconRegistry.addSvgIcon(
                icon.key,
                sanitizer.bypassSecurityTrustResourceUrl(this.urlJoin(pathPrefix, icon.path)));
        }
    }

    private urlJoin(...urlParts: string[])
    {
        return urlParts.map(p => p.replace(/^\/|\/$/g, '').trim()).join('/');
    }
}
