import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, first } from 'rxjs/operators';

import { SchemesFilters } from '../model/schemes-filters';
import { PublicScheme, PublicSchemeId, PublicSchemeDetails } from '../model/public-scheme';
import { ScreenshotSize } from '../model/screenshot';
import { SchemeSide } from '../model/scheme-side';
import { SchemesList } from '../model/schemes-lists';
import { SchemesService } from './schemes.service';

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
export class SchemesServiceStub implements SchemesService
{
    firstDelay = 300;
    nextDelay = 600;

    constructor() { }

    public getPublicSchemes(filters: SchemesFilters, list: SchemesList, size: number, cursor?: string | null)
    {
        // if (Math.random() > 0.5)
        // {
        //     return throwError('test');
        // }
        return new BehaviorSubject(({
            cursor: this.randomString(4),
            done: Math.random() > 0.7,
            data: (Array.apply(null, Array(size)) as null[]).map(() =>
            {
                const side = filters.side === SchemeSide.None
                    ? Math.random() > 0.25 ? SchemeSide.Dark : SchemeSide.Light
                    : filters.side;
                const screenshots = side === SchemeSide.Dark ? darkSchemes : lightSchemes;

                return ({
                    id: this.randomString(8),
                    name: `Fake ${this.randomString(4)} scheme ${filters.name}`,
                    publisher: {
                        id: this.randomString(8),
                        name: `${this.randomString(6)} ${this.randomString(4)}`,
                        community: list === SchemesList.Community ? true :
                            list === SchemesList.MidnightLizard ? false :
                                Math.random() > 0.5
                    },
                    favorited: Math.random() > 0.5,
                    liked: Math.random() > 0.5,
                    likes: Math.floor(Math.random() * 100),
                    side: side,
                    screenshots: [{
                        title: '',
                        urls: {
                            [ScreenshotSize._1280x800]: screenshots[Math.floor(Math.random() * screenshots.length)]
                        }
                    }]
                });
            })
        })).pipe(delay(cursor ? this.nextDelay : this.firstDelay));
    }

    public getPublicSchemeDetails(publicSchemeId: PublicSchemeId)
    {
        return new BehaviorSubject<PublicSchemeDetails>({
            id: publicSchemeId,
            name: `Fake ${this.randomString(4)} scheme`,
            publisher: {
                id: this.randomString(8),
                name: `${this.randomString(6)} ${this.randomString(4)}`,
                community: Math.random() > 0.5
            },
            favorited: Math.random() > 0.5,
            liked: Math.random() > 0.5,
            likes: Math.floor(Math.random() * 100),
            side: SchemeSide.Dark,
            screenshots: [{
                title: '',
                urls: {
                    [ScreenshotSize._1280x800]: darkSchemes[Math.floor(Math.random() * darkSchemes.length)]
                }
            }],
            colorScheme: null,
            description: lorem
        }).pipe(delay(this.firstDelay));
    }

    private randomString(length: number)
    {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let text = possible.charAt(Math.floor(Math.random() * (possible.length - 10)));

        for (let i = 0; i < length - 1; i++)
        {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

const lorem = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
