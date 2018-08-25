export interface Settings
{
    readonly IDENTITY_URL: string;
    readonly PORTAL_URL: string;
    readonly SCHEMES_QUERIER_URL: string;
    /** Refresh tokens interval in miliseconds */
    readonly PORTAL_AUTH_REFRESH_INTERVAL: string;
    readonly USE_AUTH: string;
}

export const defaultSettings: Settings = {
    IDENTITY_URL: 'http://192.168.1.35:32006',
    PORTAL_URL: 'http://localhost:7000',
    SCHEMES_QUERIER_URL: 'http://localhost:7010',
    PORTAL_AUTH_REFRESH_INTERVAL: '10000',
    USE_AUTH: false.toString()
};
