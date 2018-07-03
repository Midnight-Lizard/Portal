import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, first } from 'rxjs/operators';

import { SchemesFilters } from '../model/schemes-filters';
import { PublicScheme } from '../model/public-scheme';
import { ScreenshotSize } from '../model/screenshot';
import { SchemeSide } from '../model/scheme-side';

const darkSchemes = [
    // tslint:disable-next-line:max-line-length
    'https://lh3.googleusercontent.com/xGFHyTjX8IWoU8W4GypW-rKZ-O83MDhP3dr5sBWvj0cpG7ITyD-GkhVk1jE-bLtyDO5FtDReCLdPUA-J51-vbD13ibL54_CIMagf=w1920-h1200',
    // tslint:disable-next-line:max-line-length
    'https://lh3.googleusercontent.com/QiZPT1yLxr0-Ob9QuDtrshGO6Fsw701tL1yKCWq5aqHLjBrsRbmSXKKTi3mK9b4pXhGyU8vi1X1McamyzYGkT-YyjGmXLmXkXNtC=w1920-h1200',
    // tslint:disable-next-line:max-line-length
    'https://lh3.googleusercontent.com/dzvDXQGLmzdBwaxU5qyCe08ewaFskfISVCDgtH14V57GdNRXe6WlbO8pGX20KDybqecFYWNjtLDQUuMwLuceUp0iNam9cRo_0hlE=w1920-h1200',
    // tslint:disable-next-line:max-line-length
    'https://lh3.googleusercontent.com/2elQVTWkqkLpWtqOtm6Qirt_Wl0thuhyEhQqCxzlR1MbmdSkhN4uaFKitqHtxCH2H_gpz0vuMkPOhmuOI05tOAgFdfM8cXbKLAxp=w1920-h1200',
    // tslint:disable-next-line:max-line-length
    'https://lh3.googleusercontent.com/szBFviBG1jz3r6jopNGLkHRL-raFjLuYeCmJ5as9G1vVme9AyEFSwa8qEowxhat46bpZwK-iAMuPY9vRhhrA_5ykuQRXklpfhHhs=w1920-h1200'
];

const lightSchemes = [
    // tslint:disable-next-line:max-line-length
    'https://lh3.googleusercontent.com/iv67RC1_Dncgw4Ylhq-DjTZzYaivx21vaTM6_uQ-x5TLkwo4lTu2MOYsINVIyZ5CxvXgzR5gZ4UZDHa-6CeQyA_xgbPG5p-nZp8=w1920-h1200'
];

@Injectable()
export class SchemesService
{
    constructor() { }

    public getPublicSchemes(filters: SchemesFilters, size: number, cursor?: string | null)
    {
        return new BehaviorSubject(({
            cursor: this.randomString(4),
            done: Math.random() > 0.7,
            data: Array.apply(null, Array(size)).map(() =>
            {
                const side = filters.side === SchemeSide.None
                    ? Math.random() > 0.25 ? SchemeSide.Dark : SchemeSide.Light
                    : filters.side;
                const screenshots = side === SchemeSide.Dark ? darkSchemes : lightSchemes;

                return ({
                    id: this.randomString(8),
                    name: `${this.randomString(4)} ${filters.name}${this.randomString(6 - (filters.name || '').length)}`,
                    publisher: {
                        id: this.randomString(8),
                        name: `${this.randomString(6)} ${this.randomString(4)}`
                    },
                    side: side,
                    screenshots: [{
                        title: '',
                        urls: {
                            [ScreenshotSize._1280x800]: screenshots[Math.floor(Math.random() * screenshots.length)]
                        }
                    }]
                });
            })
        })).pipe(delay(cursor ? 600 : 300), first());
    }

    private randomString(length: number)
    {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let text = '';

        for (let i = 0; i < length; i++)
        {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
