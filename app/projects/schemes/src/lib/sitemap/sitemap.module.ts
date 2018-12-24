import { NgModule } from '@angular/core';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloModule } from 'apollo-angular';

import { SchemesSiteMapService } from './sitemap.service';
import { SchemesService } from '../backend/schemes.service';

@NgModule({
    providers: [
        ApolloModule, HttpLinkModule,
        SchemesService, SchemesSiteMapService,
    ]
})
export class SchemesSiteMapModule { }
