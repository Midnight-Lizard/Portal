import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule, materialModules } from 'shared';
import { TestingModule } from 'testing';
import { SchemesFeature, schemesReducers, schemesInitialState } from './store/schemes.state';
import { SchemesService } from './backend/schemes.service';

@NgModule({
    imports: [
        TestingModule.forRoot(),
        CommonModule, FormsModule, FlexLayoutModule, ReactiveFormsModule,
        SharedModule, NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(SchemesFeature, schemesReducers, { initialState: schemesInitialState }),
        EffectsModule.forRoot([])
    ],
    providers: [SchemesService, Actions],
    exports: [
        materialModules, FormsModule, ReactiveFormsModule,
    ]
})
export class SchemesTestingModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: SchemesTestingModule,
            providers: [
                SchemesService, Actions,
                TestingModule.forRoot().providers!
            ]
        };
    }
}
