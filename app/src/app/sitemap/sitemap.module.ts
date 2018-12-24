import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'dist/shared';
import { SchemesSiteMapModule } from 'schemes';

import { SiteMapComponent } from './sitemap.component';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';


const routes: Routes = [{ path: `**`, component: SiteMapComponent }];

@NgModule({
    declarations: [SiteMapComponent],
    imports: [
        ApolloModule, HttpLinkModule,
        CommonModule, RouterModule.forChild(routes),
        SharedModule.forRoot(), SchemesSiteMapModule
    ]
})
export class SiteMapModule { }
