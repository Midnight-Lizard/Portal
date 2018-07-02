import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'shared';
import { schemesRoutingComponents, SchemesRoutingModule } from './schemes.routing.module';
import { SchemesFeature, schemesReducers, schemesInitialState } from './store/schemes.state';
import { SchemesService } from './backend/schemes.service';
import { SchemesEffects } from './store/schemes.effects';

@NgModule({
    declarations: [schemesRoutingComponents],
    imports: [
        CommonModule, FormsModule, FlexLayoutModule, ReactiveFormsModule,
        SchemesRoutingModule, SharedModule,
        StoreModule.forFeature(SchemesFeature, schemesReducers, { initialState: schemesInitialState }),
        EffectsModule.forFeature([SchemesEffects])
    ],
    providers: [SchemesService, Actions, SchemesEffects]
})
export class SchemesModule { }
