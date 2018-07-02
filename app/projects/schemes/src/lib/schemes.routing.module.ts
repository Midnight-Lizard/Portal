import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchemesComponent } from './components/schemes.component';
import { SchemesFilterComponent } from './components/filter/filter.component';
import { SchemesNavigationComponent } from './components/navigation/navigation.component';

const index = 'index';

const routes: Routes = [
    { path: '', redirectTo: `${index}/full`, pathMatch: 'full' },
    {
        path: `${index}/:list`, children: [
            { path: '', component: SchemesComponent },
            { path: '', component: SchemesFilterComponent, outlet: 'right-side' },
            { path: '', component: SchemesNavigationComponent, outlet: 'left-side' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class SchemesRoutingModule { }

export const schemesRoutingComponents = [
    SchemesComponent,
    SchemesFilterComponent,
    SchemesNavigationComponent
];
