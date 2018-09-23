import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { SharedModule, LoadingModule } from 'shared';
import { schemesRoutingComponents, SchemesRoutingModule } from './schemes.routing.module';
import { SchemesFeature, schemesReducers, schemesInitialState } from './store/schemes.state';
import { SchemesService } from './backend/schemes.service';
import { SchemesEffects } from './store/schemes.effects';
import { SchemesThumbnailsComponent } from './components/thumbnails/thumbnails.component';
import { SchemeDetailsComponent } from './components/details/details.component';
import { SchemeSliderComponent } from './components/slider/slider.component';
import { ExtensionService } from './extension/extension.service';

@NgModule({
    declarations: [
        schemesRoutingComponents,
        SchemesThumbnailsComponent,
        SchemeDetailsComponent,
        SchemeSliderComponent
    ],
    imports: [
        CommonModule, FormsModule, FlexLayoutModule, ReactiveFormsModule,
        SchemesRoutingModule, SharedModule.forRoot(), LoadingModule,
        InfiniteScrollModule,
        ApolloModule, HttpLinkModule,
        StoreModule.forFeature(SchemesFeature, schemesReducers, { initialState: schemesInitialState }),
        EffectsModule.forFeature([SchemesEffects])
    ],
    providers: [SchemesService, Actions, SchemesEffects, ExtensionService],
    entryComponents: [SchemeDetailsComponent]
})
export class SchemesModule { }
