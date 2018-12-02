import * as url from 'url';
import { Settings, User, System } from 'core';

const { Issuer } = require('openid-client');
const fetch = require('node-fetch');
const querystring = require('querystring');

export class Secrets
{
    IDENTITY_PORTAL_CLIENT_SECRET = '';
    PORTAL_SESSION_SECRET = '';
}

let _issuer: any;
let _userClient: any;
let _systemClient: any;
let _system: any;
let systemClientCredentials: string;
let systemClientOptions: string;
const _tokens = new Map<string, any>();
const scopes = [
    'openid', 'profile', 'schemes-commander', 'offline_access'
].join(' ');
const signInCallbackUrl = (settings: Settings) => url.resolve(settings.PORTAL_URL, 'signedin');
const signOutCallbackUrl = (settings: Settings) => url.resolve(settings.PORTAL_URL, 'signedout');

export async function initAuth(settings: Settings, secrets: Secrets, maxRetries = 10): Promise<void>
{
    if (settings.USE_AUTH === true.toString())
    {
        let success = false, retries = 0;
        while (!success && retries < maxRetries)
        {
            try
            {
                _issuer = await Issuer.discover(settings.IDENTITY_URL);

                _userClient = new _issuer.Client({
                    client_id: 'portal-server',
                    client_secret: secrets.IDENTITY_PORTAL_CLIENT_SECRET
                });
                _userClient.CLOCK_TOLERANCE = 5;

                _systemClient = new _issuer.Client({
                    client_id: 'portal-system',
                    client_secret: secrets.IDENTITY_PORTAL_CLIENT_SECRET
                });
                _userClient.CLOCK_TOLERANCE = 5;

                systemClientCredentials = Buffer
                    .from(`portal-system:${secrets.IDENTITY_PORTAL_CLIENT_SECRET}`)
                    .toString('base64');
                systemClientOptions = querystring.stringify({
                    grant_type: 'client_credentials',
                    scope: 'schemes-querier'
                });
                await refreshSystem();
                success = !!_system;
            }
            catch (error)
            {
                console.error(`ERROR: ${error}\n at auth.initAuth`);
                await timeout(1000 + 1000 * retries);
            }
            finally
            {
                retries++;
            }
        }
        if (!success)
        {
            throw new Error('Faild to initialize auth');
        }
    }
}

export async function getValidSystemToken()
{
    if (_system.expired())
    {
        return refreshSystem(1);
    }
    else
    {
        return {
            access_token: _system.access_token
        };
    }
}

export interface AuthParams
{
    sessionId: string;
    nonce: string;
    state: string;
    settings: Settings;
    params?: any;
}
export function getSignInUrl({
    nonce: nonce,
    state: state,
    settings: settings
}: AuthParams): string | null
{
    if (_userClient)
    {
        return _userClient.authorizationUrl({
            redirect_uri: signInCallbackUrl(settings),
            response_type: 'code id_token',
            grant_types: 'authorization_code implicit',
            response_mode: 'form_post',
            scope: scopes,
            nonce: nonce,
            state: state
        });
    }
    return null;
}

export async function signOut(sessionId: string, settings: Settings): Promise<string | null>
{
    const tokens = _tokens.get(sessionId);
    if (tokens && _userClient)
    {
        _tokens.delete(sessionId);
        try
        {
            await Promise.all([
                tokens.access_token ? _userClient.revoke(tokens.access_token, 'access_token') : undefined,
                tokens.refresh_token ? _userClient.revoke(tokens.refresh_token, 'refresh_token') : undefined,
            ]);
        }
        catch (err)
        {
            console.error(`ERROR: ${err}\n at auth.signOut`);
        }
        return getSignOutUrl(tokens, settings);
    }
    return null;
}

function getSignOutUrl(tokens: any, settings: Settings): string
{
    return url.format({
        ...url.parse(_issuer.end_session_endpoint),
        search: undefined,
        query: {
            id_token_hint: tokens.id_token,
            post_logout_redirect_uri: signOutCallbackUrl(settings),
        }
    });
}

export async function handleSignInCallback({
    sessionId: sessionId,
    nonce: nonce,
    state: state,
    settings: settings,
    params: params
}: AuthParams): Promise<User | null>
{
    if (_userClient)
    {
        try
        {
            _tokens.set(sessionId, await _userClient.authorizationCallback(
                signInCallbackUrl(settings), _userClient.callbackParams(params), { nonce, state }));
            return getUser(sessionId);
        }
        catch (error)
        {
            console.error(`ERROR: ${error}\n at auth.handleSignInCallback`);
        }
    }
    return null;
}

export function getUser(sessionId: string): User | null
{
    const tokens = _tokens.get(sessionId);
    if (tokens)
    {
        const user = {
            ...tokens,
            claims: { ...tokens.claims },
            expired: tokens.expired()
        };
        delete user.refresh_token;
        return user;
    }
    return null;
}

export async function refreshUser(sessionId: string, maxRetries = 3): Promise<User | null>
{
    const tokens = _tokens.get(sessionId);
    if (tokens && _userClient)
    {
        let result: any = null, retries = 0;
        while (!result && retries < maxRetries)
        {
            try
            {
                result = await _userClient.refresh(tokens);
            }
            catch (error)
            {
                console.error(`ERROR: ${error}\n at auth.refreshUser`);
                await timeout(1000 + 500 * retries);
            }
            finally
            {
                retries++;
            }
        }
        _tokens.set(sessionId, result || tokens);
        return getUser(sessionId);
    }
    return null;
}

export async function refreshSystem(maxRetries = 3): Promise<System>
{
    let result: any = null, retries = 0;
    while (!result && retries < maxRetries)
    {
        try
        {
            result = await fetch(_issuer.token_endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${systemClientCredentials}`
                },
                body: systemClientOptions
            }).then((resp: Response) => resp.json());
        }
        catch (error)
        {
            console.error(`ERROR: ${error}\n at auth.refreshSystem`);
            await timeout(1000 + 500 * retries);
        }
        finally
        {
            retries++;
        }
    }
    _system = result || _system;
    return {
        access_token: _system.access_token
    };
}

const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));


