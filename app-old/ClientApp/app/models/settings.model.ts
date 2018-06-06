import { Injectable } from "@angular/core";

declare const TRANSFER_CACHE: { settings: Settings };

@Injectable()
export class Settings
{
    constructor() { }

    // static current: Settings;

    public schemesUrl: string;
    public identityUrl: string;
    public env: "prod" | "test" | "dev";

    // public static initializeServerSideSettings()
    // {
    //     return Object.assign(new Settings(), process.env);
    // }

    // public static initializeClientSideSettings()
    // {
    //     return TRANSFER_CACHE.settings;
    // }
}