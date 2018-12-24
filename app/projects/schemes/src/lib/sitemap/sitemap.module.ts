import { NgModule, ModuleWithProviders } from '@angular/core';

import { SchemesSiteMapService } from './sitemap.service';
import { SchemesService } from '../backend/schemes.service';

@NgModule()
export class SchemesSiteMapModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: SchemesSiteMapModule,
            providers: [SchemesService, SchemesSiteMapService]
        };
    }
}
