import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from 'shared';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: LoadingComponent },
    { path: 'silentin', component: LoadingComponent },
    { path: 'signedin', component: LoadingComponent },
    { path: 'signout', component: LoadingComponent },
    { path: 'signout-callback-oidc', component: LoadingComponent },
    { path: 'signedout', component: LoadingComponent },
    { path: 'profile', component: LoadingComponent },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routingComponents = [];
