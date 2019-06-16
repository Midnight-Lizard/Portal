import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ValidateConsentGuard, AcceptConsentGuard, MetaData } from 'core';

import { HomeComponent } from './components/home/home.component';
import { CommanderComponent } from './components/commander/commander.component';
import { PrivacyComponent } from './polices/privacy/privacy.component';
import { TermsComponent } from './polices/terms/terms.component';
import { WebStoreComponent } from './components/web-store/web-store.component';
import { HomeNavigationComponent } from './components/home-nav/home-nav.component';
import { ExtensionPrivacyComponent } from './polices/extension-privacy/extension-privacy.component';
import { routes } from './app.routes';


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
    HomeComponent, CommanderComponent, PrivacyComponent, ExtensionPrivacyComponent,
    TermsComponent, WebStoreComponent, HomeNavigationComponent
];
