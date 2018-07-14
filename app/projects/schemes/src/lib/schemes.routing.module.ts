import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchemesFilterComponent } from './components/filter/filter.component';
import { SchemesNavigationComponent } from './components/navigation/navigation.component';
import { SchemesListComponent } from './components/list/list.component';

const index = 'index';

const routes: Routes = [
    {
        path: `${index}/:list/:id`, children: [
            { path: '', component: SchemesListComponent },
            { path: '', component: SchemesFilterComponent, outlet: 'right-side' },
            { path: '', component: SchemesNavigationComponent, outlet: 'left-side' }
        ]
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
