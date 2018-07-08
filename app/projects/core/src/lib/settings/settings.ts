export interface Settings
{
    IDENTITY_URL: string;
    PORTAL_URL: string;
    PORTAL_AUTH_SECRET: string;
    /** Refresh tokens interval in miliseconds */
    PORTAL_AUTH_REFRESH_INTERVAL: string;
}

export const defaultSettings: Settings = {
    IDENTITY_URL: 'http://192.168.1.35:32006',
    PORTAL_URL: 'http://localhost:7000',
    PORTAL_AUTH_SECRET: 'will be a secret',
    PORTAL_AUTH_REFRESH_INTERVAL: '10000'
};
