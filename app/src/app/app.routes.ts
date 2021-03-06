import { Routes } from '@angular/router';

import { MetaData, ValidateConsentGuard, AcceptConsentGuard } from 'core';
import { ReloadFromServerComponent, LoadingComponent } from 'shared';

import { HomeComponent } from './components/home/home.component';
import { HomeNavigationComponent } from './components/home-nav/home-nav.component';
import { WebStoreComponent } from './components/web-store/web-store.component';
import { PrivacyComponent } from './polices/privacy/privacy.component';
import { ExtensionPrivacyComponent } from './polices/extension-privacy/extension-privacy.component';
import { TermsComponent } from './polices/terms/terms.component';
import { CommanderComponent } from './components/commander/commander.component';

const meta: { [route: string]: MetaData & { ephemeral?: boolean } } = {
    'home': {
        title: 'Midnight Lizard - color schemes for all websites',
        description: 'Extension for Chrome and Firefox with custom color schemes for all websites. ' +
            'Each color scheme works on all websites and will never become outdated. ' +
            'Choose between dark, light, grayscale or colorful color schemes. ' +
            'Adjust brightness, saturation, contrast and hues. ' +
            'Improve accessibility and readability. ' +
            'Apply blue light filter to protect your eyes at evening time. ' +
            'Shade bright colors and images. Use dark night mode on all websites.'
    },
    'privacy': { title: 'Midnight Lizard Website Privacy Policy' },
    'extension-privacy': { title: 'Midnight Lizard Web-Extension Privacy Policy' },
    'terms': { title: 'Midnight Lizard Website Terms of Service' },
    'signin': { title: 'Redirecting', ephemeral: true },
    'signout': { title: 'Redirecting', ephemeral: true },
    'accept-consent': { title: 'Consent', ephemeral: true },
};

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', children: [
            { path: '', component: HomeComponent, data: meta['home'] },
            { path: '', component: HomeNavigationComponent, outlet: 'left-side' },
            { path: '', component: WebStoreComponent, outlet: 'right-side' },
        ]
    },
    {
        path: 'privacy', children: [
            { path: '', component: PrivacyComponent, data: meta['privacy'] },
            { path: '', component: HomeNavigationComponent, outlet: 'left-side' },
            { path: '', component: WebStoreComponent, outlet: 'right-side' },
        ]
    },
    {
        path: 'extension-privacy', children: [
            { path: '', component: ExtensionPrivacyComponent, data: meta['extension-privacy'] },
            { path: '', component: HomeNavigationComponent, outlet: 'left-side' },
            { path: '', component: WebStoreComponent, outlet: 'right-side' },
        ]
    },
    {
        path: 'terms', children: [
            { path: '', component: TermsComponent, data: meta['terms'] },
            { path: '', component: HomeNavigationComponent, outlet: 'left-side' },
            { path: '', component: WebStoreComponent, outlet: 'right-side' },
        ]
    },
    { path: 'schemes', loadChildren: () => import('./lazy/schemes.loader.module').then(m => m.SchemesLoaderModule) },
    { path: 'sitemap', loadChildren: () => import('./sitemap/sitemap.module').then(m => m.SiteMapModule) },
    {
        path: 'signin', component: ReloadFromServerComponent,
        data: meta['signin'], canActivate: [ValidateConsentGuard]
    },
    {
        path: 'signout', component: ReloadFromServerComponent,
        data: meta['signout'], canActivate: [ValidateConsentGuard]
    },
    {
        path: 'accept-consent', component: LoadingComponent,
        data: meta['accept-consent'], canActivate: [AcceptConsentGuard]
    },
    { path: 'api', component: CommanderComponent },
    { path: '**', redirectTo: 'home' }
];
