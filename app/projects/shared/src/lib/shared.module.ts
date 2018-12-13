import { NgModule, Inject, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScriptLoaderModule } from 'ngx-script-loader';
import
{
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule,
    MatTooltipModule, MatProgressSpinnerModule, MatPaginatorModule,
    MatSortModule, MatButtonToggleModule, MatGridListModule,
    MatCardModule, MatBadgeModule, MatSnackBarModule, MatTabsModule,
    MatBottomSheetModule, MatDialogModule
} from '@angular/material';
import { SvgIconService } from './svg-icon.service';
import { ReplacePipe } from './pipes/string/replace.pipe';
import { AdComponent } from './components/ad/ad.component';

export const materialModules = [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule,
    MatSidenavModule, MatIconModule, MatInputModule, MatMenuModule,
    MatTooltipModule, MatProgressSpinnerModule, MatPaginatorModule,
    MatSortModule, MatButtonToggleModule, MatGridListModule,
    MatCardModule, MatBadgeModule, MatSnackBarModule, MatTabsModule,
    MatBottomSheetModule, MatDialogModule
];

export const pipes = [ReplacePipe];
export const components = [AdComponent];

@NgModule({
    imports: [
        materialModules,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ScriptLoaderModule,
    ],
    declarations: [pipes, components],
    exports: [materialModules, pipes, components]
})
export class SharedModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: SharedModule,
            providers: [
                SvgIconService
            ]
        };
    }
}
