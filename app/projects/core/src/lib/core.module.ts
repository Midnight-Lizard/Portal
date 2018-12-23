import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth/auth.service';
import { SideService } from './side/side.service';
import { AuthFeature, authReducers, authInitialState } from './store/auth/auth.state';
import { AuthEffects } from './store/auth/auth.effects';
import { NavEffects } from './store/nav/nav.effects';
import { NavFeature, navReducers, navInitialState } from './store/nav/nav.state';
import { InfoFeature, infoReducers, infoInitialState } from './store/info/info.state';
import { InfoEffects } from './store/info/info.effects';
import { ConsentCookieService } from './consent/consent-cookie.service';
import { ConsentService } from './consent/consent.service';
import { ValidateConsentGuard } from './consent/validate-consent.guard';
import { AcceptConsentGuard } from './consent/accept-consent.guard';
import { Title, Meta } from '@angular/platform-browser';
import { MetaService } from './meta/meta.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { SettingsService } from './settings/settings.service';

const effects = [AuthEffects, NavEffects, InfoEffects];
const providers = [
    ...effects,
    AuthService, SettingsService, SideService, Actions, Title, Meta, MetaService,
    CookieService, ConsentCookieService, ConsentService,
    ValidateConsentGuard, AcceptConsentGuard,
];

@NgModule({
    imports: [
        StoreModule.forFeature(AuthFeature, authReducers, { initialState: authInitialState }),
        StoreModule.forFeature(InfoFeature, infoReducers, { initialState: infoInitialState }),
        StoreModule.forFeature(NavFeature, navReducers, { initialState: navInitialState }),
        EffectsModule.forFeature(effects)
    ],
    providers: providers
})
export class CoreModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: CoreModule,
            providers: providers
        };
    }
}
