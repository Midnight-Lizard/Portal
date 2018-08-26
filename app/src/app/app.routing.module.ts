import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoadingComponent, ReloadFromServerComponent } from 'shared';
import { CommanderComponent } from './components/commander/commander.component';
import { ValidateConsentGuard, AcceptConsentGuard } from 'core';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'schemes', loadChildren: './lazy/schemes.loader.module#SchemesLoaderModule' },
    {
        path: 'signin', component: ReloadFromServerComponent,
        data: { server: true }, canActivate: [ValidateConsentGuard]
    },
    { path: 'signout', component: ReloadFromServerComponent, data: { server: true } },
    {
        path: 'accept-consent', component: LoadingComponent,
        canActivate: [AcceptConsentGuard]
    },
    { path: 'api', component: CommanderComponent },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        initialNavigation: 'enabled'
    })],
    exports: [RouterModule],
    providers: [AcceptConsentGuard, ValidateConsentGuard]
})
export class AppRoutingModule { }

export const routingComponents = [
    HomeComponent, CommanderComponent
];
