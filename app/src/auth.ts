import * as url from 'url';
import { Settings, User } from 'core';

const { Issuer } = require('openid-client');

export class Secrets
{
    IDENTITY_PORTAL_CLIENT_SECRET = '';
    PORTAL_SESSION_SECRET = '';
}

let _issuer: any;
let _client: any;
const _tokens = new Map<string, any>();
const scopes = [
    'openid', 'profile', 'schemes-commander', 'schemes-querier', 'offline_access'
].join(' ');
const signInCallbackUrl = (settings: Settings) => url.resolve(settings.PORTAL_URL, 'signedin');
const signOutCallbackUrl = (settings: Settings) => url.resolve(settings.PORTAL_URL, 'signedout');

export function initAuth(settings: Settings, secrets: Secrets): Promise<void>
{
    return Issuer.discover(settings.IDENTITY_URL)
        .then((mlid: typeof Issuer) =>
        {
            _issuer = mlid;
            _client = new _issuer.Client({
                client_id: 'portal-server',
                client_secret: secrets.IDENTITY_PORTAL_CLIENT_SECRET
            });
            _client.CLOCK_TOLERANCE = 5;
        })
        .catch((error: any) => console.error(`ERROR: ${error}\n at auth.initAuth`));
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
    if (_client)
    {
        return _client.authorizationUrl({
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
    if (tokens && _client)
    {
        try
        {
            await Promise.all([
                tokens.access_token ? _client.revoke(tokens.access_token, 'access_token') : undefined,
                tokens.refresh_token ? _client.revoke(tokens.refresh_token, 'refresh_token') : undefined,
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
    if (_client)
    {
        try
        {
            _tokens.set(sessionId, await _client.authorizationCallback(
                signInCallbackUrl(settings), _client.callbackParams(params), { nonce, state }));
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

export async function refreshUser(sessionId: string): Promise<any>
{
    const tokens = _tokens.get(sessionId);
    if (tokens && _client)
    {
        try
        {
            _tokens.set(sessionId, await _client.refresh(tokens));
            return getUser(sessionId);
        }
        catch (error)
        {
            console.error(`ERROR: ${error}\n at auth.refreshUser`);
        }
    }
    return null;
}


