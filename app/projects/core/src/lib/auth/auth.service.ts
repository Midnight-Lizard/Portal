import { Injectable, Inject } from '@angular/core';
import { UserManager, Log, UserManagerSettings } from 'oidc-client';

import { SideService } from '../side.service';
import { SettingsService } from '../settings/settings.service';
import { User } from './user';


@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    protected readonly config: UserManagerSettings;

    constructor(
        @Inject('USER')
        protected readonly user: User,
        @Inject('BASE_URL')
        protected readonly baseUrl: string,
        protected readonly env: SideService,
        protected readonly settingsService: SettingsService)
    {
        // Log.logger = console;
        this.config = {
            authority: settingsService.getSettings().identityUrl,
            client_id: 'portal-client',
            response_type: 'id_token token',
            scope: [
                'openid', 'profile', 'schemes-commander', 'schemes-querier'
            ].join(' '),
            post_logout_redirect_uri: this.urlJoin(this.baseUrl, 'signedout'),
        };
    }

    public signin(returnUrl: string): Promise<User>
    {
        const userManager = new UserManager(this.config);
        return userManager.signinRedirect({
            redirect_uri: this.urlJoin(this.baseUrl, 'signedin'),
            state: { returnUrl: returnUrl }
        });
    }

    public signinCallback(): Promise<User>
    {
        return new UserManager({}).signinRedirectCallback();
    }

    public signinSilent(): Promise<User>
    {
        if (this.env.isServerSide)
        {
            return Promise.resolve(this.user);
        }
        else
        {
            const userManager = new UserManager(this.config);
            return userManager.signinSilent({
                redirect_uri: this.urlJoin(this.baseUrl, 'silentsignedin')
            });
        }
    }

    public signout()
    {
        return new UserManager(this.config).signoutRedirect();
    }

    public signoutCallback()
    {
        return new UserManager({}).signoutRedirectCallback();
    }

    public getUser(): Promise<User>
    {
        return new UserManager({}).getUser();
    }

    private urlJoin(...urlParts: string[])
    {
        return urlParts.map(p => p.replace(/^\/|\/$/g, '').trim()).join('/');
    }
}
