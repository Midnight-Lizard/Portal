import { Injectable, Inject } from "@angular/core";
import { UserManager, Log, User } from 'oidc-client';
import { SideService } from "../../shared/side.service";
import { Settings } from "../models/settings.model";
import { buildUrl } from "../../shared/url.helper";


@Injectable()
export class AuthenticationService
{
    constructor(
        @Inject("USER")
        protected readonly user: User,
        @Inject('BASE_URL')
        protected baseUrl: string,
        protected readonly env: SideService)
    {
        //Log.logger = console;
    }

    protected readonly config = {
        authority: Settings.current.IDENTITY_URL,
        client_id: "portal-client",
        response_type: "id_token token",
        scope: "openid profile schemes-commander schemes-querier",
        post_logout_redirect_uri: buildUrl(this.baseUrl, "signedout"),
    };

    public signin(returnUrl: string)
    {
        const userManager = new UserManager(this.config);
        return userManager.signinRedirect({
            redirect_uri: buildUrl(this.baseUrl, "signedin"),
            state: { returnUrl: returnUrl }
        });
    }

    public signinCallback()
    {
        return new UserManager({}).signinRedirectCallback();
    }

    public signinSilent()
    {
        if (this.env.isServerSide)
        {
            return Promise.resolve(this.user);
        }
        else
        {
            const userManager = new UserManager(this.config);
            return userManager.signinSilent({
                redirect_uri: buildUrl(this.baseUrl, "silentsignedin")
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

    public getUser()
    {
        return new UserManager({}).getUser();
    }
}