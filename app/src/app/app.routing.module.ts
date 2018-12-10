import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoadingComponent, ReloadFromServerComponent } from 'shared';
import { CommanderComponent } from './components/commander/commander.component';
import { ValidateConsentGuard, AcceptConsentGuard } from 'core';
import { PrivacyComponent } from './polices/privacy/privacy.component';
import { TermsComponent } from './polices/terms/terms.component';
import { WebStoreComponent } from './components/web-store/web-store.component';
import { HomeNavigationComponent } from './components/home-nav/home-nav.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', children: [
            { path: '', component: HomeComponent, data: { title: 'Midnight Lizard - custom color schemes for all websites' } },
            { path: '', component: HomeNavigationComponent, outlet: 'left-side' },
            { path: '', component: WebStoreComponent, outlet: 'right-side' }
        ]
    },
    {
        path: 'privacy', children: [
            { path: '', component: PrivacyComponent, data: { title: 'Privacy Policy - Midnight Lizard' } },
            { path: '', component: HomeNavigationComponent, outlet: 'left-side' },
            { path: '', component: WebStoreComponent, outlet: 'right-side' }
        ]
    },
    {
        path: 'terms', children: [
            { path: '', component: TermsComponent, data: { title: 'Terms of Service - Midnight Lizard' } },
            { path: '', component: HomeNavigationComponent, outlet: 'left-side' },
            { path: '', component: WebStoreComponent, outlet: 'right-side' }
        ]
    },
    { path: 'schemes', loadChildren: './lazy/schemes.loader.module#SchemesLoaderModule' },
    {
        path: 'signin', component: ReloadFromServerComponent,
        data: { ephemeral: true, title: 'Redirecting' }, canActivate: [ValidateConsentGuard]
    },
    {
        path: 'signout', component: ReloadFromServerComponent,
        data: { ephemeral: true, title: 'Redirecting' }, canActivate: [ValidateConsentGuard]
    },
    {
        path: 'accept-consent', component: LoadingComponent,
        data: { ephemeral: true }, canActivate: [AcceptConsentGuard]
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
    HomeComponent, CommanderComponent, PrivacyComponent,
    TermsComponent, WebStoreComponent, HomeNavigationComponent
];
