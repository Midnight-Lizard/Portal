import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { SchemesFilterComponent } from './components/filter/filter.component';
import { SchemesNavigationComponent } from './components/navigation/navigation.component';
import { SchemesListComponent } from './components/list/list.component';
import { SchemesList } from './model/schemes-lists';
import { MetaData } from 'core';

const index = 'index';

const meta: MetaData = {
    title: 'Color schemes - Midnight Lizard',
    description: 'Online color schemes regestry for Midnight Lizard extension. ' +
        'Choose from a wide range of color schemes that work on all websites and will never become outdated. ' +
        'Choose between dark, light, grayscale or colorful color schemes. ' +
        'Improve accessibility and readability. ' +
        'Use blue light filter to protect your eyes at evening time. ' +
        'Shade bright colors and images. Use dark night mode on all websites.'
};

const routes: Routes = [
    {
        path: `${index}/:list/:id`, children: [
            { path: '', component: SchemesListComponent, data: meta },
            { path: '', component: SchemesFilterComponent, outlet: 'right-side' },
            { path: '', component: SchemesNavigationComponent, outlet: 'left-side' }
        ]
    },
    {
        path: `${index}/${SchemesList.Community}`,
        redirectTo: `${index}/${SchemesList.Community}/`
    },
    {
        path: `${index}/${SchemesList.Favorites}`,
        redirectTo: `${index}/${SchemesList.Favorites}/`
    },
    {
        path: `${index}/${SchemesList.LikedSchemes}`,
        redirectTo: `${index}/${SchemesList.LikedSchemes}/`
    },
    {
        path: `${index}/${SchemesList.Original}`,
        redirectTo: `${index}/${SchemesList.Original}/`
    },
    {
        path: `${index}/${SchemesList.UserSchemes}`,
        redirectTo: `${index}/${SchemesList.UserSchemes}/`
    },
    { path: '**', redirectTo: `${index}/full/` }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchemesRoutingModule { }

export const schemesRoutingComponents = [
    SchemesFilterComponent,
    SchemesNavigationComponent,
    SchemesListComponent,
];
