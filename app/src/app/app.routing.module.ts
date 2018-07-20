import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoadingComponent, ReloadFromServerComponent } from 'shared';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'schemes', loadChildren: './lazy/schemes.loader.module#SchemesLoaderModule' },
    { path: 'signin', component: ReloadFromServerComponent, data: { server: true } },
    { path: 'signout', component: ReloadFromServerComponent, data: { server: true } },
    { path: 'profile', component: LoadingComponent },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        initialNavigation: 'enabled'
    })],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routingComponents = [
    HomeComponent
];
