import { NgModule } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { SharedModule, LoadingModule } from 'shared';
import { SettingsService, AuthRootState } from 'core';

import { schemesRoutingComponents, SchemesRoutingModule } from './schemes.routing.module';
import { SchemesFeature, schemesReducers, schemesInitialState } from './store/schemes.state';
import { SchemesService } from './backend/schemes.service';
import { SchemesEffects } from './store/schemes.effects';
import { SchemesThumbnailsComponent } from './components/thumbnails/thumbnails.component';
import { SchemeDetailsComponent } from './components/details/details.component';
import { SchemeSliderComponent } from './components/slider/slider.component';
import { ExtensionService } from './extension/extension.service';
import { ExtensionGuard } from './extension/extension.guard';
import { StandAloneSchemesService } from './backend/schemes.service.stand-alone';

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
    providers: [
        Actions, SchemesEffects,
        ExtensionService, ExtensionGuard,
        {
            provide: SchemesService,
            useFactory: getSchemesService,
            deps: [HttpLink, Store, SettingsService, Apollo]
        }
    ],
    entryComponents: [SchemeDetailsComponent]
})
export class SchemesModule { }

export function getSchemesService(
    httpLink: HttpLink, store$: Store<AuthRootState>,
    settingsService: SettingsService, apollo: Apollo)
{
    if (settingsService.getSettings().IS_STAND_ALONE)
    {
        return new StandAloneSchemesService();
    }
    else
    {
        return new SchemesService(httpLink, store$, settingsService, apollo);
    }
}
