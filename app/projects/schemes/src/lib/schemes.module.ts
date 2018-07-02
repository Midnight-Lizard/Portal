import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';

import { schemesRoutingComponents, SchemesRoutingModule } from './schemes.routing.module';
import { SchemesFeature, schemesReducers, schemesInitialState } from './store/schemes.state';
import { SchemesService } from './backend/schemes.service';
import { SchemesEffects } from './store/schemes.effects';

@NgModule({
    declarations: [schemesRoutingComponents],
    imports: [
        SchemesRoutingModule,
        StoreModule.forFeature(SchemesFeature, schemesReducers, { initialState: schemesInitialState }),
        EffectsModule.forFeature([SchemesEffects])
    ],
    providers: [SchemesService, Actions, SchemesEffects]
})
export class SchemesModule { }
