import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export enum Side
{
    Browser = 'browser',
    Server = 'server'
}

@Injectable({
    providedIn: 'root'
})
export class SideService
{
    readonly side: Side;

    constructor(@Inject(PLATFORM_ID) private readonly platform_id: Object)
    {
        this.side = isPlatformBrowser(platform_id) ? Side.Browser : Side.Server;
    }

    public get isServerSide() { return this.side === Side.Server; }
    public get isBrowserSide() { return this.side === Side.Browser; }

    public on<TResult>(side: Side, execute: (...args: any[]) => TResult, ...args: any[]): TResult | undefined
    {
        if (side === this.side)
        {
            return execute && execute(...args);
        }
    }
}
