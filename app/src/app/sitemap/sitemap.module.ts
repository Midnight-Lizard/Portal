import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'dist/shared';
import { SchemesSiteMapModule } from 'schemes';

import { SiteMapComponent } from './sitemap.component';


const routes: Routes = [{ path: `**`, component: SiteMapComponent }];

@NgModule({
    declarations: [SiteMapComponent],
    imports: [
        CommonModule, RouterModule.forChild(routes),
        SharedModule.forRoot(), SchemesSiteMapModule.forRoot()
    ],
    providers: [],
    entryComponents: []
})
export class SiteMapModule { }
