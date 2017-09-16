import { Injectable } from "@angular/core";

@Injectable()
export class Settings
{
    static current: Settings;

    public SCHEMES_URL: string;
    public ENV: "prod" | "test" | "dev";

    public static initializeServerSideSettings()
    {
        Settings.current = new Settings();
        Object.assign(Settings.current, process.env);
    }

    public static initializeClientSideSettings()
    {
        Settings.current = new Settings();
        Object.assign(Settings.current,
            JSON.parse((document.getElementById("Settings") as HTMLInputElement).value));
    }
}