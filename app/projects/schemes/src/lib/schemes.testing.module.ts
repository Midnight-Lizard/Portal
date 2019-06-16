import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule, materialModules, LoadingModule, SvgIconService } from 'shared';
import { TestingModule } from 'testing';
import { MetaService, MetaServiceStub, ImpressionsService, ImpressionsServiceStub } from 'core';

import { SchemesFeature, schemesReducers, schemesInitialState } from './store/schemes.state';
import { SchemesService } from './backend/schemes.service';
import { SchemesServiceStub } from './backend/schemes.service.stub';
import { ExtensionService } from './extension/extension.service';
import { ExtensionServiceStub } from './extension/extension.service.stub';

@NgModule({
    imports: [
        TestingModule.forRoot(), HttpClientModule,
        CommonModule, FormsModule, FlexLayoutModule, ReactiveFormsModule,
        SharedModule, LoadingModule, NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(SchemesFeature, schemesReducers, { initialState: schemesInitialState }),
        EffectsModule.forRoot([])
    ],
    exports: [
        materialModules, FormsModule, ReactiveFormsModule, LoadingModule, FlexLayoutModule
    ],
    providers: [
        SvgIconService
    ]
})
export class SchemesTestingModule
{
    constructor(iconService: SvgIconService)
    {
        iconService.registerSvgIcons();
    }
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: SchemesTestingModule,
            providers: [
                Actions, SvgIconService, SchemesServiceStub,
                { provide: ImpressionsService, useClass: ImpressionsServiceStub },
                { provide: SchemesService, useClass: SchemesServiceStub },
                { provide: ExtensionService, useClass: ExtensionServiceStub },
                { provide: MetaService, useClass: MetaServiceStub }
            ]
        };
    }
}
