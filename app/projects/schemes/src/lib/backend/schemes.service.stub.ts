import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, first } from 'rxjs/operators';

import { SettingsService, User } from 'core';

import { SchemesFilters } from '../model/schemes-filters';
import { PublicScheme, PublicSchemeId, PublicSchemeDetails } from '../model/public-scheme';
import { ScreenshotSize, Screenshot } from '../model/screenshot';
import { SchemeSide } from '../model/scheme-side';
import { SchemesList } from '../model/schemes-lists';

const darkSchemes = [
    {
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.ExtraSmall]: 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/640x400.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Small]: 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/800x500.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Medium]: 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/960x600.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Large]: 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/1120x700.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.ExtraLarge]: 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/1280x800.jpg',
    },
    {
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.ExtraSmall]: 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/640x400.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Small]: 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/800x500.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Medium]: 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/960x600.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Large]: 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/1120x700.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.ExtraLarge]: 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/1280x800.jpg',
    },
    {
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.ExtraSmall]: 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/640x400.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Small]: 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/800x500.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Medium]: 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/960x600.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Large]: 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/1120x700.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.ExtraLarge]: 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/1280x800.jpg',
    }
];

const lightSchemes = [
    {
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.ExtraSmall]: 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/640x400.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Small]: 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/800x500.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Medium]: 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/960x600.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.Large]: 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/1120x700.jpg',
        // tslint:disable-next-line:max-line-length
        [ScreenshotSize.ExtraLarge]: 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/1280x800.jpg',
    }
];

@Injectable()
export class SchemesServiceStub
{
    firstDelay = 300;
    nextDelay = 600;

    constructor() { }

    public getPublicSchemes(filters: SchemesFilters, list: SchemesList, pageSize: number, user?: User | null, cursor?: string | null)
    {
        // if (Math.random() > 0.5)
        // {
        //     return throwError('test');
        // }
        return new BehaviorSubject(({
            cursor: this.randomString(4),
            done: Math.random() > 0.7,
            results: (Array.apply(null, Array(pageSize)) as null[]).map(() =>
            {
                const side = filters.side === SchemeSide.None
                    ? Math.random() > 0.25 ? SchemeSide.Dark : SchemeSide.Light
                    : filters.side;
                const screenshots = side === SchemeSide.Dark ? darkSchemes : lightSchemes;
                const screenshotUrls = screenshots[Math.floor(Math.random() * screenshots.length)];

                return ({
                    id: this.randomString(8),
                    name: `Fake ${this.randomString(4)} scheme ${filters.query}`,
                    publisher: {
                        id: this.randomString(8),
                        name: `${this.randomString(6)} ${this.randomString(4)}`,
                        community: list === SchemesList.Community ? true :
                            list === SchemesList.Original ? false :
                                Math.random() > 0.5
                    },
                    favorited: Math.random() > 0.5,
                    liked: Math.random() > 0.5,
                    likes: Math.floor(Math.random() * 100),
                    screenshots: [{
                        title: '',
                        urls: screenshotUrls
                    }]
                });
            })
        })).pipe(delay(cursor ? this.nextDelay : this.firstDelay));
    }

    public getFullList()
    {
        return new BehaviorSubject(({
            results: (Array.apply(null, Array(20)) as null[]).map(() => ({
                id: this.randomString(8),
                name: `Fake ${this.randomString(4)} scheme`
            }))
        })).pipe(delay(this.firstDelay));
    }

    public getPublicSchemeDetails(publicSchemeId: PublicSchemeId)
    {
        return new BehaviorSubject<PublicSchemeDetails>({
            id: publicSchemeId,
            generation: 1,
            name: `Fake ${this.randomString(4)} scheme`,
            publisher: {
                id: this.randomString(8),
                name: `${this.randomString(6)} ${this.randomString(4)}`,
                community: Math.random() > 0.5
            },
            favorited: Math.random() > 0.5,
            liked: Math.random() > 0.5,
            likes: Math.floor(Math.random() * 100),
            screenshots: [
                this.CreateFakeScreenshot(),
                this.CreateFakeScreenshot(),
                this.CreateFakeScreenshot(),
                this.CreateFakeScreenshot(),
            ],
            colorScheme: testColorScheme,
            description: lorem
        }).pipe(delay(this.firstDelay));
    }

    private CreateFakeScreenshot(): Screenshot
    {
        const screenshotUrls = darkSchemes[Math.floor(Math.random() * darkSchemes.length)];
        return {
            title: this.randomString(16),
            urls: screenshotUrls
        };
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


const testColorScheme = {
    'colorSchemeId': 'monokai',
    'colorSchemeName': 'Monokai',
    'runOnThisSite': true,
    'doNotInvertContent': false,
    'blueFilter': 0,
    'mode': 'auto',
    'modeAutoSwitchLimit': 5000,
    'useDefaultSchedule': true,
    'scheduleStartHour': 0,
    'scheduleFinishHour': 24,
    'includeMatches': '',
    'excludeMatches': '',
    'backgroundSaturationLimit': 90,
    'backgroundContrast': 50,
    'backgroundLightnessLimit': 15,
    'backgroundGraySaturation': 8,
    'backgroundGrayHue': 70,
    'backgroundReplaceAllHues': false,
    'backgroundHueGravity': 0,
    'buttonSaturationLimit': 100,
    'buttonContrast': 7,
    'buttonLightnessLimit': 25,
    'buttonGraySaturation': 11,
    'buttonGrayHue': 55,
    'buttonReplaceAllHues': false,
    'buttonHueGravity': 0,
    'textSaturationLimit': 80,
    'textContrast': 75,
    'textLightnessLimit': 100,
    'textGraySaturation': 30,
    'textGrayHue': 60,
    'textSelectionHue': 55,
    'textReplaceAllHues': false,
    'textHueGravity': 0,
    'linkSaturationLimit': 80,
    'linkContrast': 50,
    'linkLightnessLimit': 90,
    'linkDefaultSaturation': 80,
    'linkDefaultHue': 80,
    'linkVisitedHue': 32,
    'linkReplaceAllHues': false,
    'linkHueGravity': 80,
    'borderSaturationLimit': 80,
    'borderContrast': 20,
    'borderLightnessLimit': 50,
    'borderGraySaturation': 8,
    'borderGrayHue': 53,
    'borderReplaceAllHues': false,
    'borderHueGravity': 0,
    'imageLightnessLimit': 90,
    'imageSaturationLimit': 100,
    'useImageHoverAnimation': false,
    'backgroundImageLightnessLimit': 40,
    'backgroundImageSaturationLimit': 100,
    'hideBigBackgroundImages': true,
    'maxBackgroundImageSize': 500,
    'scrollbarSaturationLimit': 7,
    'scrollbarContrast': 0,
    'scrollbarLightnessLimit': 40,
    'scrollbarGrayHue': 60,
    'scrollbarSize': 10,
    'scrollbarStyle': true
};
