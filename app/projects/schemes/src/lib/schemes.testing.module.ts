import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule, materialModules, LoadingModule } from 'shared';
import { TestingModule } from 'testing';
import { SchemesFeature, schemesReducers, schemesInitialState } from './store/schemes.state';
import { SchemesService } from './backend/schemes.service';
import { SchemesServiceStub } from './backend/schemes.service.stub';

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
        materialModules, FormsModule, ReactiveFormsModule, LoadingModule
    ]
})
export class SchemesTestingModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: SchemesTestingModule,
            providers: [
                Actions,
                TestingModule.forRoot().providers!,
                { provide: SchemesService, useClass: SchemesServiceStub }
            ]
        };
    }
}
