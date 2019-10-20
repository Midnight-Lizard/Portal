export interface Settings
{
    readonly IDENTITY_URL: string;
    readonly PORTAL_URL: string;
    readonly SCHEMES_QUERIER_URL: string;
    readonly SCHEMES_COMMANDER_URL: string;
    readonly IMPRESSIONS_COMMANDER_URL: string;
    /** Refresh tokens interval in miliseconds */
    readonly PORTAL_USER_AUTH_REFRESH_INTERVAL: string;
    readonly PORTAL_SYSTEM_AUTH_REFRESH_INTERVAL: string;
    readonly USE_AUTH: string;
    readonly IS_STAND_ALONE: string;
}

export const defaultSettings: Settings = {
    IDENTITY_URL: 'http://192.168.1.35:32006',
    PORTAL_URL: 'http://localhost:7000',
    SCHEMES_QUERIER_URL: 'http://localhost:7010',
    SCHEMES_COMMANDER_URL: 'http://localhost:7011',
    IMPRESSIONS_COMMANDER_URL: 'http://localhost:7070',
    PORTAL_USER_AUTH_REFRESH_INTERVAL: '10000',
    PORTAL_SYSTEM_AUTH_REFRESH_INTERVAL: '10000',
    USE_AUTH: 'false',
    IS_STAND_ALONE: 'true'
};
