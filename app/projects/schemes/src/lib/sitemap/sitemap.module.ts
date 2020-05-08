import { NgModule } from '@angular/core';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloModule } from 'apollo-angular';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Store } from '@ngrx/store';

import { SettingsService } from 'core';

import { SchemesSiteMapService } from './sitemap.service';
import { SchemesService } from '../backend/schemes.service';
import { getSchemesService } from '../backend/schemes.service.resolver';

@NgModule({
    providers: [
        ApolloModule, HttpLinkModule,
        {
            provide: SchemesService,
            useFactory: getSchemesService,
            deps: [HttpLink, Store, SettingsService, Apollo]
        }, SchemesSiteMapService,
    ]
})
export class SchemesSiteMapModule { }
