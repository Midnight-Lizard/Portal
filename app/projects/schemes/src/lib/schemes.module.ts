import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from 'shared';
import { schemesRoutingComponents, SchemesRoutingModule } from './schemes.routing.module';
import { SchemesFeature, schemesReducers, schemesInitialState } from './store/schemes.state';
import { SchemesService } from './backend/schemes.service';
import { SchemesEffects } from './store/schemes.effects';
import { ThumbnailsComponent } from './components/thumbnails/thumbnails.component';
import { SchemeDetailsComponent } from './components/details/details.component';

@NgModule({
    declarations: [
        schemesRoutingComponents,
        ThumbnailsComponent,
        SchemeDetailsComponent
    ],
    imports: [
        CommonModule, FormsModule, FlexLayoutModule, ReactiveFormsModule,
        SchemesRoutingModule, SharedModule, InfiniteScrollModule,
        StoreModule.forFeature(SchemesFeature, schemesReducers, { initialState: schemesInitialState }),
        EffectsModule.forFeature([SchemesEffects])
    ],
    providers: [SchemesService, Actions, SchemesEffects],
    entryComponents: [SchemeDetailsComponent]
})
export class SchemesModule { }
