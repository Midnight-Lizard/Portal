import { NgModule } from '@angular/core';
import { SchemesComponent } from './components/schemes.component';
import { Routes, RouterModule } from '@angular/router';

const index = 'index';

const routes: Routes = [
  { path: '', redirectTo: `${index}/full`, pathMatch: 'full' },
  {
    path: `${index}/:list`, children: [
      { path: '', component: SchemesComponent },
      { path: '', component: SchemesComponent, outlet: 'right-side' },
      { path: '', component: SchemesComponent, outlet: 'left-side' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SchemesRoutingModule { }

export const schemesRoutingComponents = [
  SchemesComponent
];
