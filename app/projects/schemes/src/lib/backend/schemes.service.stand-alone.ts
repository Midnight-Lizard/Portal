// tslint:disable:max-line-length
import { Observable, of } from 'rxjs';

import { User } from 'core';

import { PublicScheme, PublicSchemeDetails } from '../model/public-scheme';
import { SchemesFilters } from '../model/schemes-filters';
import { SchemesList } from '../model/schemes-lists';
import { HueFilter } from '../model/hue-filter';
import { SchemeSide } from '../model/scheme-side';

export class StandAloneSchemesService
{
    public getPublicSchemes(filters: SchemesFilters, list: SchemesList,
        pageSize: number, user?: User | null | undefined, cursor?: string | null | undefined):
        Observable<{ cursor: string; done: boolean; results: PublicScheme[]; }>
    {
        return of({
            cursor: 'none',
            done: true,
            results: data.filter(this.getSchemesFilter(filters, list))
        });
    }

    private getSchemesFilter(filters: SchemesFilters, list: SchemesList)
    {
        return (scheme: PublicSchemeData) =>
        {
            let listCondition = true, queryCondition = true,
                bgCondition = true, sideCondition = true;

            switch (list)
            {
                case SchemesList.Community:
                    listCondition = scheme.publisher.community;
                    break;

                case SchemesList.Original:
                    listCondition = !scheme.publisher.community;
                    break;

                default: break;
            }

            if (filters.query)
            {
                queryCondition = [scheme.name, scheme.publisher.name, scheme.description]
                    .some(x => x.toLowerCase().includes(filters.query.toLowerCase()));
            }

            switch (filters.bg)
            {
                case HueFilter.Red:
                    bgCondition =
                        this.bgHueInRange(scheme, 0, 30) ||
                        this.bgHueInRange(scheme, 330, 360);
                    break;
                case HueFilter.Yellow:
                    bgCondition = this.bgHueInRange(scheme, 30, 90);
                    break;
                case HueFilter.Green:
                    bgCondition = this.bgHueInRange(scheme, 90, 150);
                    break;
                case HueFilter.Cyan:
                    bgCondition = this.bgHueInRange(scheme, 150, 210);
                    break;
                case HueFilter.Blue:
                    bgCondition = this.bgHueInRange(scheme, 210, 270);
                    break;
                case HueFilter.Purple:
                    bgCondition = this.bgHueInRange(scheme, 270, 330);
                    break;
                case HueFilter.Gray:
                    bgCondition =
                        scheme.colorScheme.backgroundGraySaturation < 10 &&
                        scheme.colorScheme.blueFilter < 5;
                    break;

                default: break;
            }

            switch (filters.side)
            {
                case SchemeSide.Dark:
                    sideCondition = scheme.colorScheme.backgroundLightnessLimit < 30;
                    break;
                case SchemeSide.Light:
                    sideCondition = scheme.colorScheme.backgroundLightnessLimit > 70;
                    break;

                default: break;
            }

            return listCondition && queryCondition && bgCondition && sideCondition;
        };
    }

    public bgHueInRange(scheme: PublicSchemeData, small: number, big: number)
    {
        return scheme.colorScheme.backgroundGrayHue >= small &&
            scheme.colorScheme.backgroundGrayHue <= big;
    }

    public getFullList(): Observable<{ results: { id: string; name: string; }[]; }>
    {
        return of({
            results: data.map(x => ({ id: x.id, name: x.name }))
        });
    }

    public getPublicSchemeDetails(publicSchemeId: string, user?: User | null | undefined): Observable<PublicSchemeDetails>
    {
        return of(data.find(x => x.id === publicSchemeId)!);
    }

    public updatePublicSchemeLikes(publicScheme: PublicScheme, user: User): void
    {
        throw new Error('Method not implemented.');
    }

    public updatePublicSchemeFavorites(publicScheme: PublicScheme, user: User): void
    {
        throw new Error('Method not implemented.');
    }
}

declare type PublicSchemeData = typeof data[0];

const data = [
    {
      'id': 'a8fb12b7-080a-4a56-a947-e47e73326f2c',
      'name': 'Noir',
      'description': ' With this dark night color scheme all websites will look like from old black & white movies with small red accent color. It darkens all pages, removes unnecesary colors and fills buttons with red color.',
      'generation': 1,
      'likes': 11,
      'liked': false,
      'likedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        '77ecdd46-16c7-47e6-88c7-de1819dd681b',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'cda591d5-c554-453e-9afe-1a3c100d07f3',
        '5b5cf62d-d589-4e72-b1b2-1aa508fd3d17',
        '3142a003-1c21-42aa-9ba2-2eceb7e8ea55',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        'd72e21d3-a6d7-42dc-8974-00e7e99aa148',
        'ed15eec8-6f84-48bf-88a2-241dd54fcc6d'
      ],
      'favorited': false,
      'favoritedBy': [
        '71771134-26ee-4c86-a714-57dfccc028e3',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        'dbc6d74f-e72e-4e6e-abe1-de6bf32e7d3a',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        '77ecdd46-16c7-47e6-88c7-de1819dd681b',
        'dc58694f-e218-4efc-a6ae-d057a8d84d81',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        '2063511d-4be8-424f-aa3b-d0f72837078d',
        'c68d44d4-d035-4607-aeb4-8827a116f9cb',
        '09fdd27a-b5ba-4e3c-a894-ed0a8cdd9bb8'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a8fb12b7-080a-4a56-a947-e47e73326f2c/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'noir',
        'colorSchemeName': 'Noir',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 10,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 10,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 190,
        'textSaturationLimit': 10,
        'textContrast': 75,
        'textLightnessLimit': 95,
        'textGraySaturation': 0,
        'textGrayHue': 180,
        'textSelectionHue': 270,
        'linkSaturationLimit': 40,
        'linkContrast': 70,
        'linkLightnessLimit': 90,
        'linkDefaultSaturation': 40,
        'linkDefaultHue': 231,
        'linkVisitedHue': 291,
        'borderSaturationLimit': 10,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 0,
        'borderGrayHue': 180,
        'imageLightnessLimit': 75,
        'imageSaturationLimit': 10,
        'backgroundImageLightnessLimit': 30,
        'backgroundImageSaturationLimit': 10,
        'scrollbarSaturationLimit': 0,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 190,
        'buttonSaturationLimit': 100,
        'buttonContrast': 10,
        'buttonLightnessLimit': 30,
        'buttonGraySaturation': 0,
        'buttonGrayHue': 355,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 95,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'fa5d7029-83ea-4020-a9e1-67c46627f21c',
      'name': 'Green on Black',
      'description': ' This is one of the most efficient color schemes for night time or low light environment reading. All backgrounds are intensively darkened and all text colors are replaced with green. You can use it to apply dark night mode to all websites.',
      'generation': 1,
      'likes': 11,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '8dcb3a77-0307-4a14-ab2e-278dba55dc87',
        'f7fb4616-fc56-40d5-89a0-9f79362cd9a9',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        '733bc1d4-c707-487d-8774-9552d16caefb',
        'cd2b73c1-db2f-4a3a-83d8-3b522828b6fd',
        'aede0bae-e03f-49a0-9570-d4e4528d3f57',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '279a5dfb-391b-498b-a979-7434452e5edf',
        '1faeae2e-fb5c-4e51-96aa-ace28844e54f',
        '8fa66386-8a92-4831-95c2-cc1381c0a373'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        'f7fb4616-fc56-40d5-89a0-9f79362cd9a9',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        'd74a0bdf-5bf5-4361-8e05-8dbd4d3cfda6',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        'e0310540-3d46-431c-9868-211128f5a869',
        '733bc1d4-c707-487d-8774-9552d16caefb',
        'ca7db6e1-7dc6-4029-b67b-e58d357483f4',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        '09fdd27a-b5ba-4e3c-a894-ed0a8cdd9bb8'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/fa5d7029-83ea-4020-a9e1-67c46627f21c/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'greenOnBlack',
        'colorSchemeName': 'Green on Black',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 10,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 125,
        'textSaturationLimit': 60,
        'textContrast': 60,
        'textLightnessLimit': 90,
        'textGraySaturation': 80,
        'textGrayHue': 122,
        'textSelectionHue': 231,
        'linkSaturationLimit': 80,
        'linkContrast': 55,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 90,
        'linkDefaultHue': 88,
        'linkVisitedHue': 42,
        'borderSaturationLimit': 60,
        'borderContrast': 40,
        'borderLightnessLimit': 70,
        'borderGraySaturation': 50,
        'borderGrayHue': 122,
        'imageLightnessLimit': 75,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 40,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 50,
        'scrollbarGrayHue': 122,
        'buttonSaturationLimit': 80,
        'buttonContrast': 3,
        'buttonLightnessLimit': 12,
        'buttonGraySaturation': 0,
        'buttonGrayHue': 125,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 60,
        'linkHueGravity': 60,
        'borderHueGravity': 80,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '290df625-70a2-426e-a3f3-9fa0c105f78d',
      'name': 'Thick Forest',
      'description': ' A beautiful palette which breathes with freshness, like in the thick forest. The colors of the soil, grass, leaves – nature, natural colors. They create a favorable emotional background, the atmosphere of rest and relaxation. Use this color scheme to bring dark night mode to all websites.',
      'generation': 2,
      'likes': 11,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'e7f9efe9-1f85-4ecf-b042-14afacca5578',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        '18f04aaa-6669-4b06-99d9-4e3037d88542',
        '9e6adc84-0a88-443f-a301-841cd09cd70f',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '401f7e6d-58af-43b2-aefa-8e95148136df',
        '8f26c22a-c265-4813-9682-e4b2ce54e04e',
        'b8cf648a-a207-4cac-ae93-7736597b5a6a',
        '9fa40570-efa9-4a90-9cac-3502ea15547d'
      ],
      'favorited': false,
      'favoritedBy': [
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'e7f9efe9-1f85-4ecf-b042-14afacca5578',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        '18f04aaa-6669-4b06-99d9-4e3037d88542',
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'dcec2bd1-1717-4272-9876-56658832465b',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        '9e6adc84-0a88-443f-a301-841cd09cd70f',
        '09fdd27a-b5ba-4e3c-a894-ed0a8cdd9bb8'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/290df625-70a2-426e-a3f3-9fa0c105f78d/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'thickForest',
        'colorSchemeName': 'Thick Forest',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 60,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 15,
        'backgroundGraySaturation': 35,
        'backgroundGrayHue': 201,
        'textSaturationLimit': 60,
        'textContrast': 60,
        'textLightnessLimit': 100,
        'textGraySaturation': 76,
        'textGrayHue': 69,
        'textSelectionHue': 147,
        'linkSaturationLimit': 60,
        'linkContrast': 53,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 80,
        'linkDefaultHue': 147,
        'linkVisitedHue': 43,
        'borderSaturationLimit': 60,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 32,
        'borderGrayHue': 75,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 28,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 46,
        'scrollbarGrayHue': 19,
        'buttonSaturationLimit': 80,
        'buttonContrast': 18,
        'buttonLightnessLimit': 37,
        'buttonGraySaturation': 40,
        'buttonGrayHue': 147,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 70,
        'buttonHueGravity': 60,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '5ee9c6a9-4500-435d-959d-a080551b382f',
      'name': 'Validus',
      'description': ' Dark mode meets the popular new Validus theme. Here, a world of soothing teal and dark chocolate bathe your eyes in an atmosphere that will make hours of computer work a pleasure. Recommended for those with light-sensitive eyes.',
      'generation': 1,
      'likes': 11,
      'liked': false,
      'likedBy': [
        'bf2f09fc-9739-4c55-a81c-b5532002261b',
        'e83451ba-4802-4bd1-a852-a20e21c2371b',
        '990f43ad-e5ab-4aa1-85bc-4fa301fd14d4',
        'cc0e6231-cbf9-47ec-b6f3-07fc9fccc65c',
        '80cae893-6cac-4d4a-a5d4-40f08163748c',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '6453c4f2-7963-4017-996a-6b9e62542ef9',
        '3d2ac3aa-e442-4d87-a164-6a9a2a607de6',
        'e7f9efe9-1f85-4ecf-b042-14afacca5578',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '6d1a79de-48a4-40fa-92b2-587d481d1718'
      ],
      'favorited': false,
      'favoritedBy': [
        'bf2f09fc-9739-4c55-a81c-b5532002261b',
        'e83451ba-4802-4bd1-a852-a20e21c2371b',
        '990f43ad-e5ab-4aa1-85bc-4fa301fd14d4',
        'cc0e6231-cbf9-47ec-b6f3-07fc9fccc65c',
        '71771134-26ee-4c86-a714-57dfccc028e3',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '6453c4f2-7963-4017-996a-6b9e62542ef9',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '8eac9b1e-1ec4-4d44-ac84-c4891d5fa068'
      ],
      'publisher': {
        'id': '3b9ae978-a72a-4232-9807-dd9c7767b82d',
        'name': 'Randall Lewis',
        'community': true
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/5ee9c6a9-4500-435d-959d-a080551b382f/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'validus',
        'colorSchemeName': 'Validus',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 30,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 14,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 8,
        'textSaturationLimit': 80,
        'textContrast': 41,
        'textLightnessLimit': 60,
        'textGraySaturation': 55,
        'textGrayHue': 173,
        'textSelectionHue': 173,
        'linkSaturationLimit': 80,
        'linkContrast': 56,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 50,
        'linkDefaultHue': 275,
        'linkVisitedHue': 300,
        'borderSaturationLimit': 80,
        'borderContrast': 16,
        'borderLightnessLimit': 40,
        'borderGraySaturation': 2,
        'borderGrayHue': 300,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 90,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 80,
        'scrollbarSaturationLimit': 5,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 16,
        'buttonSaturationLimit': 80,
        'buttonContrast': 4,
        'buttonLightnessLimit': 17,
        'buttonGraySaturation': 10,
        'buttonGrayHue': 8,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': true,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': true,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 20,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 50,
        'borderHueGravity': 0,
        'scrollbarStyle': 'false',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': false
      }
    },
    {
      'id': 'a811ad23-162a-42af-980c-602885fbfee8',
      'name': 'Inverted Light',
      'description': ' Simple dark night mode without color overrides. Perfect to increase contrast for reading during night time or low light environment without white backgrounds burning your eyes.',
      'generation': 1,
      'likes': 11,
      'liked': false,
      'likedBy': [
        '51f737a2-dca2-4744-bb9f-f2cbbb14a659',
        '66b6a784-a43c-4928-8b9e-77fe1b8bbc48',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '77ecdd46-16c7-47e6-88c7-de1819dd681b',
        'ec1c8556-94cc-461b-98ce-270aa076dca1',
        '89e28229-88f2-49ae-8e98-353ebb05b8e8',
        'cda591d5-c554-453e-9afe-1a3c100d07f3',
        '5b5cf62d-d589-4e72-b1b2-1aa508fd3d17',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        'eb604374-8aa4-419a-9285-4e137caa43dd',
        'c674570d-17af-4045-a02c-de0b1eb92838'
      ],
      'favorited': false,
      'favoritedBy': [
        'e9e80833-1877-435a-a4f8-c3c18fec3822',
        'ef61ba74-7f1a-418a-bfb7-adc9df4cda47',
        '66b6a784-a43c-4928-8b9e-77fe1b8bbc48',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'b5db2aa9-1a1e-499a-98b1-32696cd89492',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'cc888729-ad8c-4870-93f9-754ec9b6f852',
        'c68d44d4-d035-4607-aeb4-8827a116f9cb',
        '09fdd27a-b5ba-4e3c-a894-ed0a8cdd9bb8'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a811ad23-162a-42af-980c-602885fbfee8/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'invertedLight',
        'colorSchemeName': 'Inverted Light',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 10,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 190,
        'textSaturationLimit': 90,
        'textContrast': 75,
        'textLightnessLimit': 95,
        'textGraySaturation': 0,
        'textGrayHue': 190,
        'textSelectionHue': 207,
        'linkSaturationLimit': 80,
        'linkContrast': 65,
        'linkLightnessLimit': 85,
        'linkDefaultSaturation': 80,
        'linkDefaultHue': 231,
        'linkVisitedHue': 291,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 70,
        'borderGraySaturation': 0,
        'borderGrayHue': 190,
        'imageLightnessLimit': 75,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 0,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 190,
        'buttonSaturationLimit': 80,
        'buttonContrast': 4,
        'buttonLightnessLimit': 15,
        'buttonGraySaturation': 0,
        'buttonGrayHue': 190,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 50,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'e2b4b6bb-0b48-4b02-864b-b290505770ff',
      'name': 'Magic Potion',
      'description': ' Due to the presence of bright violet next to intense fuchsia and purple, the palette is perceived as festive, dramatic, and catchy. These colors make a contrast with lighter lilac and pale lavender. Let the web drink this magic potion and turn itself to the dark night mode.',
      'generation': 1,
      'likes': 11,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        'a29400af-b6ca-46ca-a03a-d983c6153b72',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        'dd006a12-e0f3-4021-8aa5-da2aba615244',
        '5b5cf62d-d589-4e72-b1b2-1aa508fd3d17',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '401f7e6d-58af-43b2-aefa-8e95148136df',
        '78f48975-88e1-4373-b780-23f8640641f4',
        '0f9dab66-24de-4a84-9716-cbad0fb05f13',
        '4d3c8c82-99d6-43d1-bf38-5e80a9764505'
      ],
      'favorited': false,
      'favoritedBy': [
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        'dcec2bd1-1717-4272-9876-56658832465b',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e2b4b6bb-0b48-4b02-864b-b290505770ff/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'magicPotion',
        'colorSchemeName': 'Magic Potion',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 90,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 12,
        'backgroundGraySaturation': 97,
        'backgroundGrayHue': 283,
        'textSaturationLimit': 80,
        'textContrast': 80,
        'textLightnessLimit': 100,
        'textGraySaturation': 79,
        'textGrayHue': 252,
        'textSelectionHue': 270,
        'linkSaturationLimit': 80,
        'linkContrast': 64,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 80,
        'linkDefaultHue': 257,
        'linkVisitedHue': 300,
        'borderSaturationLimit': 82,
        'borderContrast': 17,
        'borderLightnessLimit': 40,
        'borderGraySaturation': 92,
        'borderGrayHue': 323,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 76,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 316,
        'buttonSaturationLimit': 90,
        'buttonContrast': 13,
        'buttonLightnessLimit': 30,
        'buttonGraySaturation': 76,
        'buttonGrayHue': 316,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 70,
        'buttonHueGravity': 60,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'da701a92-032d-44f2-9085-00b1bf7c8e6b',
      'name': 'Antique Codex',
      'description': ' This color scheme was inspired by the view of ancient books and manuscripts. It will make all pages look like Antique Codex.',
      'generation': 1,
      'likes': 10,
      'liked': false,
      'likedBy': [
        '80cae893-6cac-4d4a-a5d4-40f08163748c',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '757ddedd-4350-423a-abef-4494dc488f0f',
        '091f1bdd-50d7-4779-995c-27e33132b142',
        'e3873e7a-f9a6-43d2-ba6d-368400de2daa',
        'c68d44d4-d035-4607-aeb4-8827a116f9cb',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '8f26c22a-c265-4813-9682-e4b2ce54e04e',
        'b4d22676-14db-44d8-b2af-7c5bbf47d027',
        '59616d09-35d2-4b17-ab9d-4894deaded7f'
      ],
      'favorited': false,
      'favoritedBy': [
        'e9e80833-1877-435a-a4f8-c3c18fec3822',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '757ddedd-4350-423a-abef-4494dc488f0f',
        '091f1bdd-50d7-4779-995c-27e33132b142',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        '76b61359-d74e-4827-bab8-5c78525cd3ee',
        'e3873e7a-f9a6-43d2-ba6d-368400de2daa',
        'c68d44d4-d035-4607-aeb4-8827a116f9cb',
        '59616d09-35d2-4b17-ab9d-4894deaded7f'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/da701a92-032d-44f2-9085-00b1bf7c8e6b/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'antiqueCodex',
        'colorSchemeName': 'Antique Codex',
        'runOnThisSite': true,
        'blueFilter': 5,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 30,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 93,
        'backgroundGraySaturation': 50,
        'backgroundGrayHue': 45,
        'textSaturationLimit': 90,
        'textContrast': 80,
        'textLightnessLimit': 100,
        'textGraySaturation': 40,
        'textGrayHue': 16,
        'textSelectionHue': 20,
        'linkSaturationLimit': 90,
        'linkContrast': 65,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 32,
        'linkVisitedHue': 15,
        'borderSaturationLimit': 80,
        'borderContrast': 60,
        'borderLightnessLimit': 100,
        'borderGraySaturation': 40,
        'borderGrayHue': 34,
        'imageLightnessLimit': 93,
        'imageSaturationLimit': 50,
        'backgroundImageLightnessLimit': 93,
        'backgroundImageSaturationLimit': 30,
        'scrollbarSaturationLimit': 15,
        'scrollbarContrast': 5,
        'scrollbarLightnessLimit': 85,
        'scrollbarGrayHue': 20,
        'buttonSaturationLimit': 40,
        'buttonContrast': 10,
        'buttonLightnessLimit': 85,
        'buttonGraySaturation': 50,
        'buttonGrayHue': 38,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '4ea71216-dde0-4c31-a6a0-d2e85335e634',
      'name': 'Solarized Dark',
      'description': ' This is an implementation of the popular color theme for IDE and code editors. With this color scheme you can use Solarized Dark color theme on any website you want to bring dark night mode to.',
      'generation': 1,
      'likes': 9,
      'liked': false,
      'likedBy': [
        'e7f9efe9-1f85-4ecf-b042-14afacca5578',
        '3d2ac3aa-e442-4d87-a164-6a9a2a607de6',
        'a29400af-b6ca-46ca-a03a-d983c6153b72',
        '18f04aaa-6669-4b06-99d9-4e3037d88542',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'dd006a12-e0f3-4021-8aa5-da2aba615244',
        '1d6eb8df-7347-4fde-a32a-ca652f7dffd7',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        '1dd34abc-75a4-47e1-8566-3b6e18ff5db9'
      ],
      'favorited': false,
      'favoritedBy': [
        '0c0037f5-604f-4b69-aeea-1942089ef64b',
        '71771134-26ee-4c86-a714-57dfccc028e3',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '3d2ac3aa-e442-4d87-a164-6a9a2a607de6',
        'e7f9efe9-1f85-4ecf-b042-14afacca5578',
        'a29400af-b6ca-46ca-a03a-d983c6153b72',
        '2aa000a1-653c-4ca8-8b8d-e4ec788c4a68'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/4ea71216-dde0-4c31-a6a0-d2e85335e634/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'solarizedDark',
        'colorSchemeName': 'Solarized Dark',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 65,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 11,
        'backgroundGraySaturation': 100,
        'backgroundGrayHue': 192,
        'textSaturationLimit': 80,
        'textContrast': 60,
        'textLightnessLimit': 90,
        'textGraySaturation': 7,
        'textGrayHue': 180,
        'textSelectionHue': 172,
        'linkSaturationLimit': 80,
        'linkContrast': 55,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 70,
        'linkDefaultHue': 205,
        'linkVisitedHue': 237,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 7,
        'borderGrayHue': 180,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 90,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 80,
        'scrollbarSaturationLimit': 7,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 180,
        'buttonSaturationLimit': 90,
        'buttonContrast': 4,
        'buttonLightnessLimit': 17,
        'buttonGraySaturation': 80,
        'buttonGrayHue': 194,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'c57fd193-354f-4969-b17b-14a2ede677f5',
      'name': 'Twitter Night Mode',
      'description': ' If you like the original Twitter Night Mode, with this color scheme you can use it on all websites to turn them to dark night mode.',
      'generation': 1,
      'likes': 9,
      'liked': false,
      'likedBy': [
        '77ecdd46-16c7-47e6-88c7-de1819dd681b',
        '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        '36a52eac-99bf-4f8a-9778-3ade42735e38',
        '80cae893-6cac-4d4a-a5d4-40f08163748c',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '1c5ae520-3dd4-4e34-9dfa-98bf43ba7c9c',
        '227705a9-e795-4d22-a165-e44bfac84de5'
      ],
      'favorited': false,
      'favoritedBy': [
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc',
        '36a52eac-99bf-4f8a-9778-3ade42735e38',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '687ed040-a79b-4251-8b09-0443745aa15c',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '1c5ae520-3dd4-4e34-9dfa-98bf43ba7c9c'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c57fd193-354f-4969-b17b-14a2ede677f5/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'twitterNightMode',
        'colorSchemeName': 'Twitter Night Mode',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 65,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 13,
        'backgroundGraySaturation': 34,
        'backgroundGrayHue': 210,
        'textSaturationLimit': 90,
        'textContrast': 80,
        'textLightnessLimit': 100,
        'textGraySaturation': 0,
        'textGrayHue': 0,
        'textSelectionHue': 207,
        'linkSaturationLimit': 80,
        'linkContrast': 50,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 90,
        'linkDefaultHue': 203,
        'linkVisitedHue': 262,
        'borderSaturationLimit': 80,
        'borderContrast': 20,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 16,
        'borderGrayHue': 206,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 30,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 30,
        'scrollbarGrayHue': 205,
        'buttonSaturationLimit': 80,
        'buttonContrast': 20,
        'buttonLightnessLimit': 40,
        'buttonGraySaturation': 76,
        'buttonGrayHue': 203,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '173da1fe-409d-4d5a-bc82-866fe67bcffe',
      'name': 'Monokai',
      'description': ' This is an implementation of the popular color theme for IDEs and code editors. With this color scheme you can use Monokai color theme on any website you want to bring dark night mode to.',
      'generation': 1,
      'likes': 8,
      'liked': false,
      'likedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '0234609d-dca4-4d6a-b2af-a57f3348379d',
        '32850e2b-cd74-4466-9948-ff30708ba69e',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'cda591d5-c554-453e-9afe-1a3c100d07f3',
        '0f9dab66-24de-4a84-9716-cbad0fb05f13',
        '80f91c5a-5690-43ad-a429-955a6413e52f'
      ],
      'favorited': false,
      'favoritedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '0234609d-dca4-4d6a-b2af-a57f3348379d',
        '32850e2b-cd74-4466-9948-ff30708ba69e',
        '2a3deffb-872d-480e-8257-06573448cce9',
        'dcec2bd1-1717-4272-9876-56658832465b',
        'e3873e7a-f9a6-43d2-ba6d-368400de2daa',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        '2063511d-4be8-424f-aa3b-d0f72837078d',
        'bb12a130-ed6e-493c-9cdc-a788bac9acb6',
        '80f91c5a-5690-43ad-a429-955a6413e52f'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/173da1fe-409d-4d5a-bc82-866fe67bcffe/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'monokai',
        'colorSchemeName': 'Monokai',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 90,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 15,
        'backgroundGraySaturation': 8,
        'backgroundGrayHue': 70,
        'textSaturationLimit': 80,
        'textContrast': 75,
        'textLightnessLimit': 100,
        'textGraySaturation': 30,
        'textGrayHue': 60,
        'textSelectionHue': 55,
        'linkSaturationLimit': 80,
        'linkContrast': 50,
        'linkLightnessLimit': 90,
        'linkDefaultSaturation': 80,
        'linkDefaultHue': 80,
        'linkVisitedHue': 32,
        'borderSaturationLimit': 80,
        'borderContrast': 20,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 8,
        'borderGrayHue': 53,
        'imageLightnessLimit': 90,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 7,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 60,
        'buttonSaturationLimit': 100,
        'buttonContrast': 7,
        'buttonLightnessLimit': 25,
        'buttonGraySaturation': 11,
        'buttonGrayHue': 55,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '6b9f696b-bef9-4ac2-9699-8d92e6ce532b',
      'name': 'Dimmed Dust',
      'description': ' This color scheme was inspired by the view of the dark defuse nebulae on the pictures from telescope. You can use it to apply dark night mode to all websites.',
      'generation': 1,
      'likes': 8,
      'liked': false,
      'likedBy': [
        '89e630ac-8843-4992-9288-ad9cf161ed47',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        '9dd2565a-ffb5-4e4a-978d-ef0a936f3b7e',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'cda591d5-c554-453e-9afe-1a3c100d07f3',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '4fcead47-bb49-4cba-9283-b647772bf803'
      ],
      'favorited': false,
      'favoritedBy': [
        '89e630ac-8843-4992-9288-ad9cf161ed47',
        'e9e80833-1877-435a-a4f8-c3c18fec3822',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        '733bc1d4-c707-487d-8774-9552d16caefb',
        '98e193c2-df55-4af7-a08e-010977fb93c5',
        'ca7db6e1-7dc6-4029-b67b-e58d357483f4',
        '9dd2565a-ffb5-4e4a-978d-ef0a936f3b7e'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/6b9f696b-bef9-4ac2-9699-8d92e6ce532b/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'dimmedDust',
        'colorSchemeName': 'Dimmed Dust',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 65,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 14,
        'backgroundGraySaturation': 5,
        'backgroundGrayHue': 200,
        'textSaturationLimit': 90,
        'textContrast': 65,
        'textLightnessLimit': 90,
        'textGraySaturation': 10,
        'textGrayHue': 16,
        'textSelectionHue': 207,
        'linkSaturationLimit': 80,
        'linkContrast': 55,
        'linkLightnessLimit': 75,
        'linkDefaultSaturation': 74,
        'linkDefaultHue': 207,
        'linkVisitedHue': 262,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 10,
        'borderGrayHue': 16,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 90,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 80,
        'scrollbarSaturationLimit': 5,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 16,
        'buttonSaturationLimit': 80,
        'buttonContrast': 4,
        'buttonLightnessLimit': 17,
        'buttonGraySaturation': 10,
        'buttonGrayHue': 200,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '91ece769-64ca-4917-922e-41c9ff758ebf',
      'name': 'Lavender Horizon',
      'description': ' This color scheme is inspired by lavender flowers blooming field and lonely trees uphill on sunset. After turning entire web into the night mode with this color scheme you can spend late hours in lavender aromagic.',
      'generation': 1,
      'likes': 7,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'a29400af-b6ca-46ca-a03a-d983c6153b72',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        'cd2b73c1-db2f-4a3a-83d8-3b522828b6fd',
        '2ba95a13-b68b-496a-a3ff-00b5fc65013e',
        '78f48975-88e1-4373-b780-23f8640641f4',
        '279086f7-2a43-42ef-a300-537b8f743303'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        'dcec2bd1-1717-4272-9876-56658832465b',
        '94922ed3-a42b-42bd-9899-66eeb05cda80',
        '61b14ad2-168e-4867-b082-16b32321f86f',
        '436ba54c-da3d-4f2d-b851-075ca11b7893',
        '2ba95a13-b68b-496a-a3ff-00b5fc65013e',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        '78f48975-88e1-4373-b780-23f8640641f4',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/91ece769-64ca-4917-922e-41c9ff758ebf/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'lavenderHorizon',
        'colorSchemeName': 'Lavender Horizon',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 100,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 16,
        'backgroundGraySaturation': 60,
        'backgroundGrayHue': 316,
        'textSaturationLimit': 100,
        'textContrast': 70,
        'textLightnessLimit': 100,
        'textGraySaturation': 60,
        'textGrayHue': 210,
        'textSelectionHue': 271,
        'linkSaturationLimit': 100,
        'linkContrast': 60,
        'linkLightnessLimit': 90,
        'linkDefaultSaturation': 70,
        'linkDefaultHue': 229,
        'linkVisitedHue': 288,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 56,
        'borderGraySaturation': 28,
        'borderGrayHue': 289,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 28,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 46,
        'scrollbarGrayHue': 289,
        'buttonSaturationLimit': 100,
        'buttonContrast': 20,
        'buttonLightnessLimit': 45,
        'buttonGraySaturation': 52,
        'buttonGrayHue': 324,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 80,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '641417e1-5773-4e95-b707-75358ed5286c',
      'name': 'Nord',
      'description': ' This is an implementation of a popular color theme for IDEs and code editors. With this color scheme you can use Nord color theme on any website you want to bring dark night mode to.',
      'generation': 1,
      'likes': 7,
      'liked': false,
      'likedBy': [
        '593c810a-195c-4158-b4b0-18a6e4feb01e',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '1c5ae520-3dd4-4e34-9dfa-98bf43ba7c9c',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'b4c5a1d9-abaf-4270-8d57-82e875df1f84',
        'ac8020f0-8ac0-4e7c-9279-cbb7317d10b9',
        'b548af49-a927-4958-a73e-85fa8c11c97d'
      ],
      'favorited': false,
      'favoritedBy': [
        '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '593c810a-195c-4158-b4b0-18a6e4feb01e',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '8bcdcfa6-0989-4135-af89-13e413edbbed',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '1c5ae520-3dd4-4e34-9dfa-98bf43ba7c9c',
        '6b231594-6168-4ee2-82d0-f4202a85ccdd',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/641417e1-5773-4e95-b707-75358ed5286c/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'nord',
        'colorSchemeName': 'Nord',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 70,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 22,
        'backgroundGraySaturation': 16,
        'backgroundGrayHue': 220,
        'textSaturationLimit': 80,
        'textContrast': 66,
        'textLightnessLimit': 100,
        'textGraySaturation': 28,
        'textGrayHue': 219,
        'textSelectionHue': 193,
        'linkSaturationLimit': 60,
        'linkContrast': 50,
        'linkLightnessLimit': 90,
        'linkDefaultSaturation': 60,
        'linkDefaultHue': 210,
        'linkVisitedHue': 280,
        'borderSaturationLimit': 60,
        'borderContrast': 18,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 16,
        'borderGrayHue': 222,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 16,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 220,
        'buttonSaturationLimit': 60,
        'buttonContrast': 10,
        'buttonLightnessLimit': 40,
        'buttonGraySaturation': 16,
        'buttonGrayHue': 222,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'c126a978-683e-4cf5-bec0-9ff1b2052fd1',
      'name': 'Discord Dark',
      'description': ' If you like the original Discord Dark Theme, with this color scheme you can use it on all websites to turn them to dark night mode.',
      'generation': 1,
      'likes': 7,
      'liked': false,
      'likedBy': [
        '6453c4f2-7963-4017-996a-6b9e62542ef9',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '3a484899-4d84-499f-80f2-af5b2da4ae03',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '34e25112-cc70-42a7-875c-183aad4fe02f',
        'b3959a6c-5b33-4e65-9a9f-97daeccdf798',
        '64dcaf76-ba08-43b2-abd9-2009a52c069f'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '6453c4f2-7963-4017-996a-6b9e62542ef9',
        '3a484899-4d84-499f-80f2-af5b2da4ae03',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '34e25112-cc70-42a7-875c-183aad4fe02f',
        '6b231594-6168-4ee2-82d0-f4202a85ccdd',
        'db80c04a-722b-4450-9cde-981e3a887210',
        '76b61359-d74e-4827-bab8-5c78525cd3ee',
        '98e193c2-df55-4af7-a08e-010977fb93c5',
        'e3873e7a-f9a6-43d2-ba6d-368400de2daa',
        '6f0fdd92-e2e1-4d35-83cb-adf4949090c8'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c126a978-683e-4cf5-bec0-9ff1b2052fd1/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'discordDark',
        'colorSchemeName': 'Discord Dark',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 65,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 23,
        'backgroundGraySaturation': 8,
        'backgroundGrayHue': 220,
        'textSaturationLimit': 90,
        'textContrast': 64,
        'textLightnessLimit': 90,
        'textGraySaturation': 14,
        'textGrayHue': 216,
        'textSelectionHue': 207,
        'linkSaturationLimit': 80,
        'linkContrast': 50,
        'linkLightnessLimit': 75,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 197,
        'linkVisitedHue': 262,
        'borderSaturationLimit': 80,
        'borderContrast': 15,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 8,
        'borderGrayHue': 204,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 80,
        'scrollbarSaturationLimit': 5,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 50,
        'scrollbarGrayHue': 200,
        'buttonSaturationLimit': 80,
        'buttonContrast': 6,
        'buttonLightnessLimit': 21,
        'buttonGraySaturation': 7,
        'buttonGrayHue': 216,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'ee70411f-5762-468a-b0ef-8d67a49556ab',
      'name': 'Blue Light Filter',
      'description': ' This color scheme provides a nice balance between a global red light shift and hand-picked colors for each page element. Blue light filter imitates natural sunlight cycles at evening and helps reduce eye strain and restore natural sleeping patterns.',
      'generation': 1,
      'likes': 7,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '8d2436c2-4fa2-4652-a6e6-5720b29bb7c8',
        '5c2e508f-4787-4cdc-9e1c-7ea4f8403ea3',
        'e3873e7a-f9a6-43d2-ba6d-368400de2daa',
        '89e28229-88f2-49ae-8e98-353ebb05b8e8',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '7a26f2a7-484d-46c7-a140-6e1bb4c28bb0'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '8d2436c2-4fa2-4652-a6e6-5720b29bb7c8',
        '5c2e508f-4787-4cdc-9e1c-7ea4f8403ea3',
        'dcec2bd1-1717-4272-9876-56658832465b',
        '76b61359-d74e-4827-bab8-5c78525cd3ee',
        'e3873e7a-f9a6-43d2-ba6d-368400de2daa',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        '59616d09-35d2-4b17-ab9d-4894deaded7f',
        '7a26f2a7-484d-46c7-a140-6e1bb4c28bb0'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ee70411f-5762-468a-b0ef-8d67a49556ab/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'blueLightFilter',
        'colorSchemeName': 'Blue Light Filter',
        'runOnThisSite': true,
        'blueFilter': 32,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 90,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 98,
        'backgroundGraySaturation': 30,
        'backgroundGrayHue': 40,
        'textSaturationLimit': 90,
        'textContrast': 70,
        'textLightnessLimit': 100,
        'textGraySaturation': 20,
        'textGrayHue': 16,
        'textSelectionHue': 324,
        'linkSaturationLimit': 90,
        'linkContrast': 70,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 300,
        'linkVisitedHue': 13,
        'borderSaturationLimit': 80,
        'borderContrast': 50,
        'borderLightnessLimit': 100,
        'borderGraySaturation': 20,
        'borderGrayHue': 24,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 100,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 20,
        'scrollbarContrast': 5,
        'scrollbarLightnessLimit': 95,
        'scrollbarGrayHue': 115,
        'buttonSaturationLimit': 100,
        'buttonContrast': 10,
        'buttonLightnessLimit': 85,
        'buttonGraySaturation': 30,
        'buttonGrayHue': 36,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 20,
        'buttonHueGravity': 10,
        'textHueGravity': 20,
        'linkHueGravity': 80,
        'borderHueGravity': 30,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '36b6589e-6e0a-40f3-aba3-9dda9af7680b',
      'name': 'Increased Contrast',
      'description': ' This light color scheme only improves contrast ratio between text, buttons, links, borders and their backgrounds without changing background color. ',
      'generation': 2,
      'likes': 7,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        'e3873e7a-f9a6-43d2-ba6d-368400de2daa',
        '89e28229-88f2-49ae-8e98-353ebb05b8e8',
        'aede0bae-e03f-49a0-9570-d4e4528d3f57',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        'e2e43e92-a726-43bd-aae5-be327ed38cb3'
      ],
      'favorited': false,
      'favoritedBy': [
        'b5db2aa9-1a1e-499a-98b1-32696cd89492',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '8f26c22a-c265-4813-9682-e4b2ce54e04e',
        'e2e43e92-a726-43bd-aae5-be327ed38cb3',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        '59616d09-35d2-4b17-ab9d-4894deaded7f'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/36b6589e-6e0a-40f3-aba3-9dda9af7680b/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'increasedContrast',
        'colorSchemeName': 'Increased Contrast',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 100,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 100,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 240,
        'textSaturationLimit': 100,
        'textContrast': 65,
        'textLightnessLimit': 100,
        'textGraySaturation': 40,
        'textGrayHue': 16,
        'textSelectionHue': 231,
        'linkSaturationLimit': 100,
        'linkContrast': 65,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 231,
        'linkVisitedHue': 291,
        'borderSaturationLimit': 100,
        'borderContrast': 55,
        'borderLightnessLimit': 100,
        'borderGraySaturation': 10,
        'borderGrayHue': 16,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 100,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 0,
        'scrollbarContrast': 5,
        'scrollbarLightnessLimit': 90,
        'scrollbarGrayHue': 240,
        'buttonSaturationLimit': 100,
        'buttonContrast': 10,
        'buttonLightnessLimit': 90,
        'buttonGraySaturation': 0,
        'buttonGrayHue': 240,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 50,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'ad0ef141-360c-4cf7-906e-110f4bf3b276',
      'name': 'Dracula',
      'description': ' This is an implementation of the popular color theme for IDEs and code editors. With this color scheme you can use Dracula color theme on any website you want to bring dark night mode to.',
      'generation': 2,
      'likes': 7,
      'liked': false,
      'likedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        '80cae893-6cac-4d4a-a5d4-40f08163748c',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        '4d3c8c82-99d6-43d1-bf38-5e80a9764505'
      ],
      'favorited': false,
      'favoritedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        '71771134-26ee-4c86-a714-57dfccc028e3',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '687ed040-a79b-4251-8b09-0443745aa15c',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '0234609d-dca4-4d6a-b2af-a57f3348379d',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ad0ef141-360c-4cf7-906e-110f4bf3b276/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'dracula',
        'colorSchemeName': 'Dracula',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 70,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 18,
        'backgroundGraySaturation': 15,
        'backgroundGrayHue': 231,
        'textSaturationLimit': 80,
        'textContrast': 78,
        'textLightnessLimit': 100,
        'textGraySaturation': 30,
        'textGrayHue': 60,
        'textSelectionHue': 210,
        'linkSaturationLimit': 80,
        'linkContrast': 60,
        'linkLightnessLimit': 90,
        'linkDefaultSaturation': 89,
        'linkDefaultHue': 265,
        'linkVisitedHue': 326,
        'borderSaturationLimit': 80,
        'borderContrast': 20,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 16,
        'borderGrayHue': 220,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 20,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 35,
        'scrollbarGrayHue': 216,
        'buttonSaturationLimit': 80,
        'buttonContrast': 20,
        'buttonLightnessLimit': 40,
        'buttonGraySaturation': 20,
        'buttonGrayHue': 225,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'd14aa24a-9d3e-47af-ad2a-28b9e626c6a4',
      'name': 'Pink Daisy',
      'description': ' Bright and rich composition that agitates imagination and attracts attention. Soft transitions of fuchsia colors, from dark to light shades create harmonious and charming picture. The addition of deep red shade makes this gamma even more expressive. Use this color scheme to shade bright backgrounds in the daytime.',
      'generation': 1,
      'likes': 7,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff068049-bf90-4c06-81c3-55e28c0602b3',
        '89e28229-88f2-49ae-8e98-353ebb05b8e8',
        'cd2b73c1-db2f-4a3a-83d8-3b522828b6fd',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '2ba95a13-b68b-496a-a3ff-00b5fc65013e',
        '4464bf8d-b0f7-40ef-a983-e9b57b22461c'
      ],
      'favorited': false,
      'favoritedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'd74a0bdf-5bf5-4361-8e05-8dbd4d3cfda6',
        '9a6c8f87-33d0-4c41-b165-88cde4b43752',
        'ff068049-bf90-4c06-81c3-55e28c0602b3',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        '94922ed3-a42b-42bd-9899-66eeb05cda80',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '4464bf8d-b0f7-40ef-a983-e9b57b22461c'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/d14aa24a-9d3e-47af-ad2a-28b9e626c6a4/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'pinkDaisy',
        'colorSchemeName': 'Pink Daisy',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 90,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 90,
        'backgroundGraySaturation': 59,
        'backgroundGrayHue': 306,
        'textSaturationLimit': 90,
        'textContrast': 65,
        'textLightnessLimit': 100,
        'textGraySaturation': 100,
        'textGrayHue': 350,
        'textSelectionHue': 286,
        'linkSaturationLimit': 90,
        'linkContrast': 60,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 270,
        'linkVisitedHue': 329,
        'borderSaturationLimit': 90,
        'borderContrast': 13,
        'borderLightnessLimit': 100,
        'borderGraySaturation': 56,
        'borderGrayHue': 318,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 100,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 56,
        'scrollbarContrast': 13,
        'scrollbarLightnessLimit': 87,
        'scrollbarGrayHue': 318,
        'buttonSaturationLimit': 90,
        'buttonContrast': 13,
        'buttonLightnessLimit': 80,
        'buttonGraySaturation': 56,
        'buttonGrayHue': 318,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 60,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'c918e4c2-9db7-4d3d-8a00-e042befd45a1',
      'name': 'YouTube Dark Theme',
      'description': ' If you like the original YouTube Dark Theme, with this color scheme you can use it on all websites to turn them to dark night mode.',
      'generation': 1,
      'likes': 7,
      'liked': false,
      'likedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '51f737a2-dca2-4744-bb9f-f2cbbb14a659',
        '36a52eac-99bf-4f8a-9778-3ade42735e38',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        'd60f5f7d-131a-4df1-9a55-cd1cfc31a979',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        'db4458eb-0dc2-43ad-88f7-b4bc97af82aa'
      ],
      'favorited': false,
      'favoritedBy': [
        '6f50a7cf-c41d-4f06-8876-9188dd6a7c44',
        'e9e80833-1877-435a-a4f8-c3c18fec3822',
        '36a52eac-99bf-4f8a-9778-3ade42735e38',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '687ed040-a79b-4251-8b09-0443745aa15c',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        'd60f5f7d-131a-4df1-9a55-cd1cfc31a979',
        '0234609d-dca4-4d6a-b2af-a57f3348379d',
        '09fdd27a-b5ba-4e3c-a894-ed0a8cdd9bb8'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c918e4c2-9db7-4d3d-8a00-e042befd45a1/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'youTubeDarkTheme',
        'colorSchemeName': 'YouTube Dark Theme',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 7,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 0,
        'textSaturationLimit': 90,
        'textContrast': 70,
        'textLightnessLimit': 100,
        'textGraySaturation': 0,
        'textGrayHue': 0,
        'textSelectionHue': 207,
        'linkSaturationLimit': 80,
        'linkContrast': 55,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 208,
        'linkVisitedHue': 262,
        'borderSaturationLimit': 80,
        'borderContrast': 15,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 0,
        'borderGrayHue': 0,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 0,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 30,
        'scrollbarGrayHue': 0,
        'buttonSaturationLimit': 90,
        'buttonContrast': 20,
        'buttonLightnessLimit': 30,
        'buttonGraySaturation': 0,
        'buttonGrayHue': 0,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '4af4624c-4752-4867-9bc3-b9d231490bfe',
      'name': 'Obsidian',
      'description': ' This is an implementation of the popular color theme for IDEs and code editors. With this color scheme you can use Obsidian color theme on any website you want to bring dark night mode to.',
      'generation': 1,
      'likes': 6,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'bf100b94-b7c7-4cc9-9c7b-e3eeae4d3a93',
        '39051bc8-5c91-4636-ac24-22ae4517fcb4',
        '227705a9-e795-4d22-a165-e44bfac84de5'
      ],
      'favorited': false,
      'favoritedBy': [
        '71771134-26ee-4c86-a714-57dfccc028e3',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        'd35856fb-4bf5-4608-af2d-12ec537eb7a7',
        '6b231594-6168-4ee2-82d0-f4202a85ccdd',
        '03b63d82-63ee-4fa1-b81d-96a80d126418',
        '2a3deffb-872d-480e-8257-06573448cce9',
        'e3873e7a-f9a6-43d2-ba6d-368400de2daa',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/4af4624c-4752-4867-9bc3-b9d231490bfe/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'obsidian',
        'colorSchemeName': 'Obsidian',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 70,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 18,
        'backgroundGraySaturation': 12,
        'backgroundGrayHue': 192,
        'textSaturationLimit': 80,
        'textContrast': 71,
        'textLightnessLimit': 100,
        'textGraySaturation': 7,
        'textGrayHue': 210,
        'textSelectionHue': 195,
        'linkSaturationLimit': 80,
        'linkContrast': 50,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 80,
        'linkDefaultHue': 91,
        'linkVisitedHue': 30,
        'borderSaturationLimit': 80,
        'borderContrast': 20,
        'borderLightnessLimit': 40,
        'borderGraySaturation': 10,
        'borderGrayHue': 200,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 13,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 34,
        'scrollbarGrayHue': 202,
        'buttonSaturationLimit': 80,
        'buttonContrast': 5,
        'buttonLightnessLimit': 30,
        'buttonGraySaturation': 27,
        'buttonGrayHue': 209,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'bc7d239f-1831-481f-b3b2-819c31b553db',
      'name': 'Aloe Juice',
      'description': ' Prepossessing and comfortable color scheme. Shades of green create the feeling of freshness, pureness and renovation. Soft transitions will help to create harmonious monochrome interface and shade bright backgrounds.',
      'generation': 1,
      'likes': 6,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'bbdbab9c-818f-4b6c-abd1-a5b270dedbd3',
        '84c2cf12-1474-4e0d-a357-6aff23af9394',
        'aede0bae-e03f-49a0-9570-d4e4528d3f57',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        'e2e43e92-a726-43bd-aae5-be327ed38cb3'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '8545b190-c087-4145-84df-a054d9ca8c57',
        'bbdbab9c-818f-4b6c-abd1-a5b270dedbd3',
        'c68d44d4-d035-4607-aeb4-8827a116f9cb',
        'baf1f79c-1dd4-465e-ba39-31cc2c3c645c',
        '84c2cf12-1474-4e0d-a357-6aff23af9394',
        '61b14ad2-168e-4867-b082-16b32321f86f',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        'e2e43e92-a726-43bd-aae5-be327ed38cb3'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/bc7d239f-1831-481f-b3b2-819c31b553db/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'aloeJuice',
        'colorSchemeName': 'Aloe Juice',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 70,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 90,
        'backgroundGraySaturation': 24,
        'backgroundGrayHue': 104,
        'textSaturationLimit': 90,
        'textContrast': 65,
        'textLightnessLimit': 100,
        'textGraySaturation': 38,
        'textGrayHue': 112,
        'textSelectionHue': 144,
        'linkSaturationLimit': 80,
        'linkContrast': 62,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 215,
        'linkVisitedHue': 270,
        'borderSaturationLimit': 80,
        'borderContrast': 31,
        'borderLightnessLimit': 100,
        'borderGraySaturation': 40,
        'borderGrayHue': 101,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 100,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 40,
        'scrollbarContrast': 15,
        'scrollbarLightnessLimit': 85,
        'scrollbarGrayHue': 101,
        'buttonSaturationLimit': 80,
        'buttonContrast': 10,
        'buttonLightnessLimit': 80,
        'buttonGraySaturation': 59,
        'buttonGrayHue': 78,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 60,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '00226e8b-666a-4c7d-af62-5f6635e1e1fe',
      'name': 'Inverted Grayscale',
      'description': ' This color scheme removes distractions from the page by decreasing color saturation of all elements on it. You can use it on all websites to make them look like a grayscale newspaper but turned to dark night mode.',
      'generation': 1,
      'likes': 5,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '733bc1d4-c707-487d-8774-9552d16caefb',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'cda591d5-c554-453e-9afe-1a3c100d07f3',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '37cb17e9-7153-4aad-8698-122b3d2feb13',
        '6b231594-6168-4ee2-82d0-f4202a85ccdd',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'c68d44d4-d035-4607-aeb4-8827a116f9cb',
        'cda591d5-c554-453e-9afe-1a3c100d07f3',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        'd393c92e-c90b-430d-9006-d7388eb3a8c3'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/00226e8b-666a-4c7d-af62-5f6635e1e1fe/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'invertedGrayscale',
        'colorSchemeName': 'Inverted Grayscale',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 10,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 10,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 190,
        'textSaturationLimit': 10,
        'textContrast': 75,
        'textLightnessLimit': 95,
        'textGraySaturation': 0,
        'textGrayHue': 190,
        'textSelectionHue': 231,
        'linkSaturationLimit': 20,
        'linkContrast': 70,
        'linkLightnessLimit': 85,
        'linkDefaultSaturation': 25,
        'linkDefaultHue': 231,
        'linkVisitedHue': 291,
        'borderSaturationLimit': 10,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 0,
        'borderGrayHue': 190,
        'imageLightnessLimit': 75,
        'imageSaturationLimit': 10,
        'backgroundImageLightnessLimit': 30,
        'backgroundImageSaturationLimit': 10,
        'scrollbarSaturationLimit': 0,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 190,
        'buttonSaturationLimit': 20,
        'buttonContrast': 2,
        'buttonLightnessLimit': 7,
        'buttonGraySaturation': 0,
        'buttonGrayHue': 190,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'ad85f394-e2d3-47f2-bd02-90abc5a571ab',
      'name': 'Shades of Purple',
      'description': ' This is an implementation of a popular color theme for VSCode. With this color scheme you can use Shades of Purple color theme on any website you want to bring dark night mode to.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '3d2ac3aa-e442-4d87-a164-6a9a2a607de6',
        '401f7e6d-58af-43b2-aefa-8e95148136df',
        '0f9dab66-24de-4a84-9716-cbad0fb05f13'
      ],
      'favorited': false,
      'favoritedBy': [
        '6f50a7cf-c41d-4f06-8876-9188dd6a7c44',
        '2c5c3315-683e-4c92-b756-d88bb8b7f069',
        '6967f5dc-be16-4513-859a-6d061298691d',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '3d2ac3aa-e442-4d87-a164-6a9a2a607de6',
        '8545b190-c087-4145-84df-a054d9ca8c57',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        '2a3deffb-872d-480e-8257-06573448cce9',
        'dcec2bd1-1717-4272-9876-56658832465b',
        'baf1f79c-1dd4-465e-ba39-31cc2c3c645c',
        '09fdd27a-b5ba-4e3c-a894-ed0a8cdd9bb8'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/ad85f394-e2d3-47f2-bd02-90abc5a571ab/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'shadesOfPurple',
        'colorSchemeName': 'Shades of Purple',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 25,
        'backgroundGraySaturation': 33,
        'backgroundGrayHue': 243,
        'textSaturationLimit': 80,
        'textContrast': 75,
        'textLightnessLimit': 100,
        'textGraySaturation': 7,
        'textGrayHue': 180,
        'textSelectionHue': 271,
        'linkSaturationLimit': 80,
        'linkContrast': 46,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 52,
        'linkVisitedHue': 21,
        'borderSaturationLimit': 80,
        'borderContrast': 26,
        'borderLightnessLimit': 51,
        'borderGraySaturation': 30,
        'borderGrayHue': 240,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 30,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 50,
        'scrollbarGrayHue': 249,
        'buttonSaturationLimit': 80,
        'buttonContrast': 13,
        'buttonLightnessLimit': 45,
        'buttonGraySaturation': 30,
        'buttonGrayHue': 270,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 90,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '9c544de2-90c3-4598-a9b3-9777c41b8d84',
      'name': 'Tropical Punch',
      'description': ' Purple traditionally represents individuality, and orange is associated with adventure and enthusiasm. This color scheme is not only visually vibrant but also evokes a similar emotion from you. Use it to turn every page to a tropical sunset on a beach.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'a29400af-b6ca-46ca-a03a-d983c6153b72',
        '2a3deffb-872d-480e-8257-06573448cce9',
        '0f9dab66-24de-4a84-9716-cbad0fb05f13'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        'dcec2bd1-1717-4272-9876-56658832465b',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        '94922ed3-a42b-42bd-9899-66eeb05cda80',
        '362ab5c4-fbd0-44c7-980f-eb0f09a80179',
        '81d7d0ce-ab3e-4395-be67-31bef509c6d6',
        '436ba54c-da3d-4f2d-b851-075ca11b7893',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/9c544de2-90c3-4598-a9b3-9777c41b8d84/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'tropicalPunch',
        'colorSchemeName': 'Tropical Punch',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 21,
        'backgroundGraySaturation': 47,
        'backgroundGrayHue': 270,
        'textSaturationLimit': 90,
        'textContrast': 65,
        'textLightnessLimit': 100,
        'textGraySaturation': 82,
        'textGrayHue': 12,
        'textSelectionHue': 210,
        'linkSaturationLimit': 80,
        'linkContrast': 56,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 26,
        'linkVisitedHue': 12,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 24,
        'borderGrayHue': 272,
        'imageLightnessLimit': 90,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 26,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 270,
        'buttonSaturationLimit': 100,
        'buttonContrast': 8,
        'buttonLightnessLimit': 38,
        'buttonGraySaturation': 24,
        'buttonGrayHue': 272,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': true,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 60,
        'textHueGravity': 0,
        'linkHueGravity': 96,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'fabcf18b-7db0-4d99-a3f7-099352e1661d',
      'name': 'Morning Mist',
      'description': ' This color scheme is inspired by an early morning landscape view when a mist drifts over a river. You can use it to shade bright colors on all websites.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '8f26c22a-c265-4813-9682-e4b2ce54e04e',
        'b4d22676-14db-44d8-b2af-7c5bbf47d027',
        '7a26f2a7-484d-46c7-a140-6e1bb4c28bb0'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '0aaf094f-3f83-472a-8869-e881dc45c4fb',
        'c68d44d4-d035-4607-aeb4-8827a116f9cb',
        '94922ed3-a42b-42bd-9899-66eeb05cda80',
        '8f26c22a-c265-4813-9682-e4b2ce54e04e',
        '7a26f2a7-484d-46c7-a140-6e1bb4c28bb0'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/fabcf18b-7db0-4d99-a3f7-099352e1661d/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'morningMist',
        'colorSchemeName': 'Morning Mist',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 90,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 90,
        'backgroundGraySaturation': 10,
        'backgroundGrayHue': 200,
        'textSaturationLimit': 90,
        'textContrast': 60,
        'textLightnessLimit': 100,
        'textGraySaturation': 20,
        'textGrayHue': 194,
        'textSelectionHue': 222,
        'linkSaturationLimit': 90,
        'linkContrast': 60,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 227,
        'linkVisitedHue': 295,
        'borderSaturationLimit': 90,
        'borderContrast': 40,
        'borderLightnessLimit': 98,
        'borderGraySaturation': 20,
        'borderGrayHue': 196,
        'imageLightnessLimit': 90,
        'imageSaturationLimit': 90,
        'backgroundImageLightnessLimit': 90,
        'backgroundImageSaturationLimit': 90,
        'scrollbarSaturationLimit': 15,
        'scrollbarContrast': 5,
        'scrollbarLightnessLimit': 80,
        'scrollbarGrayHue': 188,
        'buttonSaturationLimit': 90,
        'buttonContrast': 10,
        'buttonLightnessLimit': 85,
        'buttonGraySaturation': 30,
        'buttonGrayHue': 200,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '2cab0c86-3c11-486d-8cc4-84cdc0d09f44',
      'name': 'Yellow on Black',
      'description': ' This is one of the most efficient color schemes for night time or low light environment reading. All backgrounds are intensively darkened and all text colors are replaced with yellow. You can use it to apply dark night mode to all websites.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        '6a41a163-d497-4402-8654-7e26558da3ca',
        'b8cf648a-a207-4cac-ae93-7736597b5a6a'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '687ed040-a79b-4251-8b09-0443745aa15c',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'baf1f79c-1dd4-465e-ba39-31cc2c3c645c',
        'cda591d5-c554-453e-9afe-1a3c100d07f3',
        'c7889ccb-e242-47ac-b53b-3a1e4313c13a',
        '7acfa4e4-bb8e-44aa-8219-e34b78bb5bd3'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/2cab0c86-3c11-486d-8cc4-84cdc0d09f44/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'yellowOnBlack',
        'colorSchemeName': 'Yellow on Black',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 10,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 55,
        'textSaturationLimit': 60,
        'textContrast': 60,
        'textLightnessLimit': 90,
        'textGraySaturation': 80,
        'textGrayHue': 54,
        'textSelectionHue': 231,
        'linkSaturationLimit': 80,
        'linkContrast': 55,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 90,
        'linkDefaultHue': 60,
        'linkVisitedHue': 40,
        'borderSaturationLimit': 60,
        'borderContrast': 40,
        'borderLightnessLimit': 70,
        'borderGraySaturation': 50,
        'borderGrayHue': 54,
        'imageLightnessLimit': 75,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 40,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 50,
        'scrollbarGrayHue': 54,
        'buttonSaturationLimit': 80,
        'buttonContrast': 3,
        'buttonLightnessLimit': 12,
        'buttonGraySaturation': 0,
        'buttonGrayHue': 55,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 60,
        'linkHueGravity': 60,
        'borderHueGravity': 80,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '14a51d1b-fd11-4cda-b3b4-9f7705bc91a6',
      'name': 'Glamour Shoes',
      'description': ' Contrast combination of shades of pink and emerald will suit those who like to draw attention to themselves and bright colors. Use those colors to bring night mode to all websites.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'a29400af-b6ca-46ca-a03a-d983c6153b72',
        '401f7e6d-58af-43b2-aefa-8e95148136df',
        '8f26c22a-c265-4813-9682-e4b2ce54e04e'
      ],
      'favorited': false,
      'favoritedBy': [
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'dcec2bd1-1717-4272-9876-56658832465b',
        '94922ed3-a42b-42bd-9899-66eeb05cda80',
        '401f7e6d-58af-43b2-aefa-8e95148136df',
        '4464bf8d-b0f7-40ef-a983-e9b57b22461c',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/14a51d1b-fd11-4cda-b3b4-9f7705bc91a6/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'glamourShoes',
        'colorSchemeName': 'Glamour Shoes',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 15,
        'backgroundGraySaturation': 95,
        'backgroundGrayHue': 173,
        'textSaturationLimit': 60,
        'textContrast': 73,
        'textLightnessLimit': 100,
        'textGraySaturation': 52,
        'textGrayHue': 322,
        'textSelectionHue': 180,
        'linkSaturationLimit': 80,
        'linkContrast': 60,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 80,
        'linkDefaultHue': 288,
        'linkVisitedHue': 322,
        'borderSaturationLimit': 82,
        'borderContrast': 24,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 60,
        'borderGrayHue': 330,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 70,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 34,
        'scrollbarGrayHue': 177,
        'buttonSaturationLimit': 80,
        'buttonContrast': 17,
        'buttonLightnessLimit': 37,
        'buttonGraySaturation': 90,
        'buttonGrayHue': 339,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 70,
        'buttonHueGravity': 80,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '939e9ffe-fd50-48c1-8966-a1c2bfecf1cb',
      'name': 'Blue Dark Filter',
      'description': ' This color scheme represents an unique combination of dark night mode and blue light filter theme. It provides a nice balance between a global red light shift and hand-picked colors for each page element.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b'
      ],
      'favorited': false,
      'favoritedBy': [
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        '6967f5dc-be16-4513-859a-6d061298691d',
        'dcec2bd1-1717-4272-9876-56658832465b',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        '4333a1ad-b4a7-4fa3-b421-9bbab7a9951e'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/939e9ffe-fd50-48c1-8966-a1c2bfecf1cb/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'blueDarkFilter',
        'colorSchemeName': 'Blue Dark Filter',
        'runOnThisSite': true,
        'blueFilter': 30,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 11,
        'backgroundGraySaturation': 30,
        'backgroundGrayHue': 40,
        'textSaturationLimit': 90,
        'textContrast': 65,
        'textLightnessLimit': 90,
        'textGraySaturation': 10,
        'textGrayHue': 90,
        'textSelectionHue': 32,
        'linkSaturationLimit': 60,
        'linkContrast': 50,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 60,
        'linkDefaultHue': 88,
        'linkVisitedHue': 36,
        'borderSaturationLimit': 90,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 20,
        'borderGrayHue': 60,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 90,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 80,
        'scrollbarSaturationLimit': 20,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 45,
        'buttonSaturationLimit': 90,
        'buttonContrast': 3,
        'buttonLightnessLimit': 13,
        'buttonGraySaturation': 50,
        'buttonGrayHue': 18,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 20,
        'buttonHueGravity': 20,
        'textHueGravity': 20,
        'linkHueGravity': 80,
        'borderHueGravity': 30,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa',
      'name': 'Frozen Pumpkin',
      'description': ' Fascinating and worthy composition. Combination of warm and cold shades looks contrasting and effective. Aquamarine, light blue, orange and yellow is a natural color gamma. You can use it to apply dark night mode to all websites.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'e7f9efe9-1f85-4ecf-b042-14afacca5578',
        '733bc1d4-c707-487d-8774-9552d16caefb',
        'cb576085-457d-404c-a628-b8bcc6b9447e'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        '94922ed3-a42b-42bd-9899-66eeb05cda80',
        '61b14ad2-168e-4867-b082-16b32321f86f',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/848a0c94-0bb4-48c3-96bd-4bfcf94ba2fa/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'frozenPumpkin',
        'colorSchemeName': 'Frozen Pumpkin',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 21,
        'backgroundGraySaturation': 37,
        'backgroundGrayHue': 196,
        'textSaturationLimit': 90,
        'textContrast': 66,
        'textLightnessLimit': 100,
        'textGraySaturation': 12,
        'textGrayHue': 168,
        'textSelectionHue': 207,
        'linkSaturationLimit': 80,
        'linkContrast': 55,
        'linkLightnessLimit': 75,
        'linkDefaultSaturation': 87,
        'linkDefaultHue': 44,
        'linkVisitedHue': 30,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 38,
        'borderGrayHue': 200,
        'imageLightnessLimit': 90,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 26,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 200,
        'buttonSaturationLimit': 100,
        'buttonContrast': 8,
        'buttonLightnessLimit': 38,
        'buttonGraySaturation': 100,
        'buttonGrayHue': 38,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': true,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 70,
        'buttonHueGravity': 80,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'f00682ff-b491-47a4-9571-943233422310',
      'name': 'Sunset Sails',
      'description': ' This color scheme is inspired by the view of a vessel sailing away into the sunset. It represents an unique combination of dark night mode and blue light filter theme. It provides a nice balance between a global red light shift and hand-picked colors for each page element. You can use it to apply dark night mode to all websites.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ffde6c32-3230-4976-a153-ce1d088448d5',
        '1ca871ba-83f3-4eb7-a62a-440da458bc3b',
        'b548af49-a927-4958-a73e-85fa8c11c97d'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        'ffde6c32-3230-4976-a153-ce1d088448d5',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        'fe10611a-127f-4ea8-8992-66c2a2d68edf'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/f00682ff-b491-47a4-9571-943233422310/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'sunsetSails',
        'colorSchemeName': 'Sunset Sails',
        'runOnThisSite': true,
        'blueFilter': 30,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 15,
        'backgroundGraySaturation': 30,
        'backgroundGrayHue': 4,
        'textSaturationLimit': 90,
        'textContrast': 64,
        'textLightnessLimit': 90,
        'textGraySaturation': 20,
        'textGrayHue': 45,
        'textSelectionHue': 322,
        'linkSaturationLimit': 70,
        'linkContrast': 55,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 70,
        'linkDefaultHue': 45,
        'linkVisitedHue': 14,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 20,
        'borderGrayHue': 14,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 20,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 36,
        'buttonSaturationLimit': 80,
        'buttonContrast': 4,
        'buttonLightnessLimit': 18,
        'buttonGraySaturation': 40,
        'buttonGrayHue': 14,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 20,
        'buttonHueGravity': 20,
        'textHueGravity': 20,
        'linkHueGravity': 80,
        'borderHueGravity': 20,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'e979eeb7-d767-4d82-b200-3f9a4339f8cd',
      'name': 'Dewy Grass',
      'description': ' Green grass with dew associates with serene summer, youth and ease. Therefore, such a combination of colors is bound to cause a smile and a burst of energy. Dark green, light green, apple are colors of spring. Use these bright colors to bring dark mode to all websites.',
      'generation': 1,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ffde6c32-3230-4976-a153-ce1d088448d5',
        '8f26c22a-c265-4813-9682-e4b2ce54e04e',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'd74a0bdf-5bf5-4361-8e05-8dbd4d3cfda6',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e979eeb7-d767-4d82-b200-3f9a4339f8cd/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'dewyGrass',
        'colorSchemeName': 'Dewy Grass',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 70,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 10,
        'backgroundGraySaturation': 71,
        'backgroundGrayHue': 146,
        'textSaturationLimit': 90,
        'textContrast': 65,
        'textLightnessLimit': 90,
        'textGraySaturation': 54,
        'textGrayHue': 73,
        'textSelectionHue': 157,
        'linkSaturationLimit': 80,
        'linkContrast': 55,
        'linkLightnessLimit': 90,
        'linkDefaultSaturation': 80,
        'linkDefaultHue': 150,
        'linkVisitedHue': 45,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 48,
        'borderGrayHue': 77,
        'imageLightnessLimit': 90,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 45,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 128,
        'buttonSaturationLimit': 80,
        'buttonContrast': 18,
        'buttonLightnessLimit': 30,
        'buttonGraySaturation': 52,
        'buttonGrayHue': 111,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 60,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'b3695655-0c70-4fbd-b6c8-90cee63fe6e2',
      'name': 'Halloween',
      'description': ' This fun color scheme meant to be used during the Halloween to bring festive mood and impress your friends. You can use it to apply dark night mode to all websites.',
      'generation': 3,
      'likes': 4,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '733bc1d4-c707-487d-8774-9552d16caefb',
        '1ca871ba-83f3-4eb7-a62a-440da458bc3b',
        'b548af49-a927-4958-a73e-85fa8c11c97d'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/b3695655-0c70-4fbd-b6c8-90cee63fe6e2/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'halloween',
        'colorSchemeName': 'Halloween',
        'runOnThisSite': true,
        'blueFilter': 70,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 60,
        'backgroundLightnessLimit': 7,
        'backgroundGraySaturation': 80,
        'backgroundGrayHue': 16,
        'textSaturationLimit': 90,
        'textContrast': 70,
        'textLightnessLimit': 100,
        'textGraySaturation': 80,
        'textGrayHue': 30,
        'textSelectionHue': 324,
        'linkSaturationLimit': 90,
        'linkContrast': 60,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 80,
        'linkDefaultHue': 60,
        'linkVisitedHue': 330,
        'borderSaturationLimit': 80,
        'borderContrast': 30,
        'borderLightnessLimit': 60,
        'borderGraySaturation': 100,
        'borderGrayHue': 4,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 90,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 80,
        'scrollbarSaturationLimit': 30,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 20,
        'scrollbarGrayHue': 16,
        'buttonSaturationLimit': 80,
        'buttonContrast': 4,
        'buttonLightnessLimit': 12,
        'buttonGraySaturation': 80,
        'buttonGrayHue': 14,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 20,
        'buttonHueGravity': 20,
        'textHueGravity': 20,
        'linkHueGravity': 80,
        'borderHueGravity': 20,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '2dbad21a-bb94-4e2c-b388-1c9d76e383d3',
      'name': 'Frost Sparkles',
      'description': ' Light combination of cold lilac from rich to silver-glazed, almost white tone. It is diluted by a thread of warm gray-beige shade. It reminds of frost sparkles on the snow on a cold winter evening. It creates deliberately festive playful mood. Use this color scheme to bring dark night mode to all websites.',
      'generation': 1,
      'likes': 3,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '4d3c8c82-99d6-43d1-bf38-5e80a9764505',
        '8eac9b1e-1ec4-4d44-ac84-c4891d5fa068'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '9a6c8f87-33d0-4c41-b165-88cde4b43752',
        '94922ed3-a42b-42bd-9899-66eeb05cda80',
        '436ba54c-da3d-4f2d-b851-075ca11b7893',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        'c7889ccb-e242-47ac-b53b-3a1e4313c13a',
        '4d3c8c82-99d6-43d1-bf38-5e80a9764505',
        '730f6ee3-bf82-4883-a3c1-e0a2df5fc7f0',
        '8eac9b1e-1ec4-4d44-ac84-c4891d5fa068',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/2dbad21a-bb94-4e2c-b388-1c9d76e383d3/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'frostSparkles',
        'colorSchemeName': 'Frost Sparkles',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 70,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 27,
        'backgroundGraySaturation': 41,
        'backgroundGrayHue': 277,
        'textSaturationLimit': 90,
        'textContrast': 64,
        'textLightnessLimit': 100,
        'textGraySaturation': 29,
        'textGrayHue': 72,
        'textSelectionHue': 282,
        'linkSaturationLimit': 80,
        'linkContrast': 60,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 34,
        'linkDefaultHue': 229,
        'linkVisitedHue': 282,
        'borderSaturationLimit': 80,
        'borderContrast': 25,
        'borderLightnessLimit': 60,
        'borderGraySaturation': 29,
        'borderGrayHue': 188,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 19,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 60,
        'scrollbarGrayHue': 323,
        'buttonSaturationLimit': 80,
        'buttonContrast': 13,
        'buttonLightnessLimit': 42,
        'buttonGraySaturation': 34,
        'buttonGrayHue': 282,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 70,
        'buttonHueGravity': 70,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '8adc7ee8-4169-4baf-a628-d9cdeaa040a8',
      'name': 'Spring Blossom',
      'description': ' Fresh and touching gamma that combines pureness and mature solidity. Pastel, soft shades of pink attract with its soft charm. These feminine colors are perfect to decorate the entire web because they make atmosphere more romantic. Hot red and dark brown create effective contrasts and accents.',
      'generation': 3,
      'likes': 3,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '89e28229-88f2-49ae-8e98-353ebb05b8e8',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'd74a0bdf-5bf5-4361-8e05-8dbd4d3cfda6',
        'c9b1480b-367c-40a5-a6d2-d29ea09ce01b',
        '1a587eec-e94e-400d-8a08-f91be9740c57',
        '4464bf8d-b0f7-40ef-a983-e9b57b22461c'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/8adc7ee8-4169-4baf-a628-d9cdeaa040a8/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'springBlossom',
        'colorSchemeName': 'Spring Blossom',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 100,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 90,
        'backgroundGraySaturation': 60,
        'backgroundGrayHue': 332,
        'textSaturationLimit': 100,
        'textContrast': 64,
        'textLightnessLimit': 98,
        'textGraySaturation': 45,
        'textGrayHue': 4,
        'textSelectionHue': 280,
        'linkSaturationLimit': 90,
        'linkContrast': 60,
        'linkLightnessLimit': 90,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 210,
        'linkVisitedHue': 350,
        'borderSaturationLimit': 100,
        'borderContrast': 40,
        'borderLightnessLimit': 90,
        'borderGraySaturation': 68,
        'borderGrayHue': 350,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 100,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 50,
        'scrollbarContrast': 10,
        'scrollbarLightnessLimit': 90,
        'scrollbarGrayHue': 348,
        'buttonSaturationLimit': 100,
        'buttonContrast': 10,
        'buttonLightnessLimit': 80,
        'buttonGraySaturation': 60,
        'buttonGrayHue': 348,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 60,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '18f567d5-2d25-40e9-95e7-3160577c781c',
      'name': 'Almond Ripe',
      'description': ' This color scheme was inspired by the view of the ripe almonds on the trees. You can use it to apply dark night mode to all websites.',
      'generation': 1,
      'likes': 3,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        'cb576085-457d-404c-a628-b8bcc6b9447e'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '64b9159f-1b66-4948-b246-8c4c07208ea5',
        'cb576085-457d-404c-a628-b8bcc6b9447e',
        'baf1f79c-1dd4-465e-ba39-31cc2c3c645c',
        'bb12a130-ed6e-493c-9cdc-a788bac9acb6'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/18f567d5-2d25-40e9-95e7-3160577c781c/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'almondRipe',
        'colorSchemeName': 'Almond Ripe',
        'runOnThisSite': true,
        'blueFilter': 5,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 60,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 11,
        'backgroundGraySaturation': 30,
        'backgroundGrayHue': 36,
        'textSaturationLimit': 60,
        'textContrast': 64,
        'textLightnessLimit': 85,
        'textGraySaturation': 10,
        'textGrayHue': 90,
        'textSelectionHue': 32,
        'linkSaturationLimit': 60,
        'linkContrast': 50,
        'linkLightnessLimit': 75,
        'linkDefaultSaturation': 60,
        'linkDefaultHue': 88,
        'linkVisitedHue': 36,
        'borderSaturationLimit': 60,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 20,
        'borderGrayHue': 60,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 90,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 80,
        'scrollbarSaturationLimit': 20,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 45,
        'buttonSaturationLimit': 60,
        'buttonContrast': 3,
        'buttonLightnessLimit': 13,
        'buttonGraySaturation': 50,
        'buttonGrayHue': 18,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 80,
        'buttonHueGravity': 80,
        'textHueGravity': 80,
        'linkHueGravity': 80,
        'borderHueGravity': 80,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '6e0a4559-4dff-419c-8f56-53390385eb79',
      'name': 'Apple Mint',
      'description': ' This color scheme\'s palette is based on the colors that can be found on a flower bed with blooming apple mint. You can use it to apply dark night mode to all websites.',
      'generation': 1,
      'likes': 2,
      'liked': false,
      'likedBy': [
        'e7f9efe9-1f85-4ecf-b042-14afacca5578',
        '6967f5dc-be16-4513-859a-6d061298691d'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ff5393bd-2691-4a88-aa2d-104bfa3467f1',
        '6f81d3aa-4cf8-44c6-8c02-6f151742055a',
        'd74a0bdf-5bf5-4361-8e05-8dbd4d3cfda6',
        'dcec2bd1-1717-4272-9876-56658832465b',
        '86b61c00-b71f-415e-bcea-3be9d4650231',
        'baf1f79c-1dd4-465e-ba39-31cc2c3c645c',
        '61b14ad2-168e-4867-b082-16b32321f86f',
        '46edbb32-96e2-4bce-933f-825ec095b100',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/6e0a4559-4dff-419c-8f56-53390385eb79/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'appleMint',
        'colorSchemeName': 'Apple Mint',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 60,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 14,
        'backgroundGraySaturation': 60,
        'backgroundGrayHue': 170,
        'textSaturationLimit': 60,
        'textContrast': 65,
        'textLightnessLimit': 95,
        'textGraySaturation': 20,
        'textGrayHue': 88,
        'textSelectionHue': 88,
        'linkSaturationLimit': 60,
        'linkContrast': 60,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 60,
        'linkDefaultHue': 85,
        'linkVisitedHue': 34,
        'borderSaturationLimit': 60,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 10,
        'borderGrayHue': 130,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 10,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 133,
        'buttonSaturationLimit': 60,
        'buttonContrast': 3,
        'buttonLightnessLimit': 16,
        'buttonGraySaturation': 50,
        'buttonGrayHue': 164,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 80,
        'buttonHueGravity': 80,
        'textHueGravity': 80,
        'linkHueGravity': 80,
        'borderHueGravity': 80,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'dc571b38-1cd3-4274-bc4e-af18df763138',
      'name': 'Sky Tides',
      'description': ' A striking, refreshing palette in colors of nature. Shades of sea and endless sky. Deep aqua adds the color gamma with power and vigor. Light sky blue and semitransparent shades create a feeling of lightness, fluffiness and volume. Use this color scheme to shade bright backgrounds in the daytime.',
      'generation': 1,
      'likes': 2,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '7a26f2a7-484d-46c7-a140-6e1bb4c28bb0'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '76b61359-d74e-4827-bab8-5c78525cd3ee',
        '94922ed3-a42b-42bd-9899-66eeb05cda80',
        '8f26c22a-c265-4813-9682-e4b2ce54e04e',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        'c7889ccb-e242-47ac-b53b-3a1e4313c13a',
        '7a26f2a7-484d-46c7-a140-6e1bb4c28bb0'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/dc571b38-1cd3-4274-bc4e-af18df763138/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'skyTides',
        'colorSchemeName': 'Sky Tides',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 90,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 95,
        'backgroundGraySaturation': 31,
        'backgroundGrayHue': 225,
        'textSaturationLimit': 90,
        'textContrast': 70,
        'textLightnessLimit': 100,
        'textGraySaturation': 86,
        'textGrayHue': 202,
        'textSelectionHue': 216,
        'linkSaturationLimit': 90,
        'linkContrast': 60,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 222,
        'linkVisitedHue': 280,
        'borderSaturationLimit': 90,
        'borderContrast': 23,
        'borderLightnessLimit': 100,
        'borderGraySaturation': 37,
        'borderGrayHue': 207,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 100,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 37,
        'scrollbarContrast': 16,
        'scrollbarLightnessLimit': 90,
        'scrollbarGrayHue': 207,
        'buttonSaturationLimit': 90,
        'buttonContrast': 8,
        'buttonLightnessLimit': 87,
        'buttonGraySaturation': 43,
        'buttonGrayHue': 217,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 60,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'c4b2a8f1-2521-4973-8ca5-c2d48baafd78',
      'name': 'Bracing Lemonade',
      'description': ' Amazingly fresh and sharp palette just like bracing lemonade. Lemon shades immediately tonicize, give strength and energy. Bright light green and dark green harmoniously supplements this gamma making it deeper. Use these bright colors to bring dark mode to all websites.',
      'generation': 1,
      'likes': 2,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'd37220f4-db7e-4240-8fa4-2c14178ac0bb'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'baf1f79c-1dd4-465e-ba39-31cc2c3c645c',
        '436ba54c-da3d-4f2d-b851-075ca11b7893',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/c4b2a8f1-2521-4973-8ca5-c2d48baafd78/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'bracingLemonade',
        'colorSchemeName': 'Bracing Lemonade',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 15,
        'backgroundGraySaturation': 82,
        'backgroundGrayHue': 81,
        'textSaturationLimit': 60,
        'textContrast': 70,
        'textLightnessLimit': 100,
        'textGraySaturation': 32,
        'textGrayHue': 60,
        'textSelectionHue': 150,
        'linkSaturationLimit': 80,
        'linkContrast': 55,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 133,
        'linkVisitedHue': 42,
        'borderSaturationLimit': 60,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 51,
        'borderGrayHue': 65,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 56,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 66,
        'buttonSaturationLimit': 80,
        'buttonContrast': 21,
        'buttonLightnessLimit': 36,
        'buttonGraySaturation': 89,
        'buttonGrayHue': 80,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 60,
        'textHueGravity': 80,
        'linkHueGravity': 90,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'a6dc6c47-602a-48e8-96ec-54af456d7230',
      'name': 'Grayscale',
      'description': ' This color scheme removes distractions from the page by decreasing color saturation of all elements on it. You can use it on all websites to make them look like grayscale newspaper.',
      'generation': 1,
      'likes': 1,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '76b61359-d74e-4827-bab8-5c78525cd3ee',
        'baf1f79c-1dd4-465e-ba39-31cc2c3c645c',
        '61b14ad2-168e-4867-b082-16b32321f86f'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a6dc6c47-602a-48e8-96ec-54af456d7230/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'grayscale',
        'colorSchemeName': 'Grayscale',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 10,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 100,
        'backgroundGraySaturation': 0,
        'backgroundGrayHue': 240,
        'textSaturationLimit': 10,
        'textContrast': 60,
        'textLightnessLimit': 100,
        'textGraySaturation': 0,
        'textGrayHue': 240,
        'textSelectionHue': 231,
        'linkSaturationLimit': 25,
        'linkContrast': 60,
        'linkLightnessLimit': 100,
        'linkDefaultSaturation': 25,
        'linkDefaultHue': 231,
        'linkVisitedHue': 291,
        'borderSaturationLimit': 10,
        'borderContrast': 40,
        'borderLightnessLimit': 100,
        'borderGraySaturation': 0,
        'borderGrayHue': 240,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 10,
        'backgroundImageLightnessLimit': 100,
        'backgroundImageSaturationLimit': 10,
        'scrollbarSaturationLimit': 0,
        'scrollbarContrast': 5,
        'scrollbarLightnessLimit': 80,
        'scrollbarGrayHue': 240,
        'buttonSaturationLimit': 20,
        'buttonContrast': 5,
        'buttonLightnessLimit': 95,
        'buttonGraySaturation': 0,
        'buttonGrayHue': 240,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 0,
        'buttonHueGravity': 0,
        'textHueGravity': 0,
        'linkHueGravity': 80,
        'borderHueGravity': 0,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'e560e8e2-e91c-4304-8db9-5143a28cee1b',
      'name': 'Marigold Mix',
      'description': ' This color scheme is inspired by the colors that can be found on a flower bed with blooming and fading marigolds mixture. You can use it to apply dark night mode to all websites.',
      'generation': 2,
      'likes': 1,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        '61b14ad2-168e-4867-b082-16b32321f86f',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/e560e8e2-e91c-4304-8db9-5143a28cee1b/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'marigoldMix',
        'colorSchemeName': 'Marigold Mix',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 17,
        'backgroundGraySaturation': 67,
        'backgroundGrayHue': 4,
        'textSaturationLimit': 100,
        'textContrast': 65,
        'textLightnessLimit': 100,
        'textGraySaturation': 56,
        'textGrayHue': 43,
        'textSelectionHue': 32,
        'linkSaturationLimit': 100,
        'linkContrast': 53,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 34,
        'linkVisitedHue': 351,
        'borderSaturationLimit': 90,
        'borderContrast': 20,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 60,
        'borderGrayHue': 42,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 50,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 42,
        'buttonSaturationLimit': 100,
        'buttonContrast': 21,
        'buttonLightnessLimit': 43,
        'buttonGraySaturation': 77,
        'buttonGrayHue': 16,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 70,
        'buttonHueGravity': 70,
        'textHueGravity': 20,
        'linkHueGravity': 95,
        'borderHueGravity': 70,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': 'a8d2e435-5206-4068-93a5-f0c076a2c44e',
      'name': 'Avocado Peel',
      'description': ' Prepossessing gamma of colors compose in a single tonality. Soft and beautiful transitions of shades of green have an absolute harmony. Use this color scheme to bring dark night mode to all websites.',
      'generation': 1,
      'likes': 1,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f',
        'b6a6ae79-de70-4e9b-bcdb-a0a454059ccc'
      ],
      'publisher': {
        'id': 'cb6e68c5-c7b9-4bd7-8f53-b84592184725',
        'name': 'Pavel Agarkov',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/a8d2e435-5206-4068-93a5-f0c076a2c44e/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'avocadoPeel',
        'colorSchemeName': 'Avocado Peel',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 80,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 10,
        'backgroundGraySaturation': 58,
        'backgroundGrayHue': 107,
        'textSaturationLimit': 90,
        'textContrast': 67,
        'textLightnessLimit': 100,
        'textGraySaturation': 55,
        'textGrayHue': 73,
        'textSelectionHue': 143,
        'linkSaturationLimit': 80,
        'linkContrast': 60,
        'linkLightnessLimit': 91,
        'linkDefaultSaturation': 100,
        'linkDefaultHue': 132,
        'linkVisitedHue': 42,
        'borderSaturationLimit': 60,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 50,
        'borderGrayHue': 68,
        'imageLightnessLimit': 100,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 50,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 50,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 30,
        'scrollbarGrayHue': 81,
        'buttonSaturationLimit': 80,
        'buttonContrast': 15,
        'buttonLightnessLimit': 24,
        'buttonGraySaturation': 64,
        'buttonGrayHue': 83,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 60,
        'buttonHueGravity': 60,
        'textHueGravity': 80,
        'linkHueGravity': 90,
        'borderHueGravity': 60,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    },
    {
      'id': '0ba4cf18-474b-49b6-bf05-747d9be95bdc',
      'name': 'Kappa Dream',
      'description': ' This color scheme is inspired by peaceful forest pond\'s views where Kappas (Japanese mythical creatures) live. You can use it to apply dark night mode to all websites.',
      'generation': 1,
      'likes': 1,
      'liked': false,
      'likedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d'
      ],
      'favorited': false,
      'favoritedBy': [
        '6967f5dc-be16-4513-859a-6d061298691d',
        'ce07e28e-ec96-4d51-976b-1d188b000c0f'
      ],
      'publisher': {
        'id': '0cac2cd6-4e0a-4b7a-91b1-d248c393dbd2',
        'name': 'Midnight Lizard',
        'community': false
      },
      'screenshots': [
        {
          'title': 'DuckDuckGo',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo/1280x800.jpg'
          }
        },
        {
          'title': 'DuckDuckGo Images',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo-images/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo-images/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo-images/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo-images/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/duckduckgo-images/1280x800.jpg'
          }
        },
        {
          'title': 'Medium',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/medium/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/medium/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/medium/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/medium/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/medium/1280x800.jpg'
          }
        },
        {
          'title': 'Wikipedia',
          'urls': {
            'xs': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/wikipedia/640x400.jpg',
            'sm': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/wikipedia/800x500.jpg',
            'md': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/wikipedia/960x600.jpg',
            'lg': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/wikipedia/1120x700.jpg',
            'xl': 'https://res.cloudinary.com/midnight-lizard/cs/0ba4cf18-474b-49b6-bf05-747d9be95bdc/wikipedia/1280x800.jpg'
          }
        }
      ],
      'colorScheme': {
        'colorSchemeId': 'kappaDream',
        'colorSchemeName': 'Kappa Dream',
        'runOnThisSite': true,
        'blueFilter': 0,
        'useDefaultSchedule': true,
        'scheduleStartHour': 0,
        'scheduleFinishHour': 24,
        'backgroundSaturationLimit': 60,
        'backgroundContrast': 50,
        'backgroundLightnessLimit': 15,
        'backgroundGraySaturation': 30,
        'backgroundGrayHue': 122,
        'textSaturationLimit': 60,
        'textContrast': 65,
        'textLightnessLimit': 95,
        'textGraySaturation': 30,
        'textGrayHue': 72,
        'textSelectionHue': 132,
        'linkSaturationLimit': 60,
        'linkContrast': 55,
        'linkLightnessLimit': 80,
        'linkDefaultSaturation': 70,
        'linkDefaultHue': 68,
        'linkVisitedHue': 34,
        'borderSaturationLimit': 60,
        'borderContrast': 30,
        'borderLightnessLimit': 50,
        'borderGraySaturation': 20,
        'borderGrayHue': 82,
        'imageLightnessLimit': 80,
        'imageSaturationLimit': 100,
        'backgroundImageLightnessLimit': 40,
        'backgroundImageSaturationLimit': 100,
        'scrollbarSaturationLimit': 20,
        'scrollbarContrast': 0,
        'scrollbarLightnessLimit': 40,
        'scrollbarGrayHue': 120,
        'buttonSaturationLimit': 60,
        'buttonContrast': 4,
        'buttonLightnessLimit': 18,
        'buttonGraySaturation': 40,
        'buttonGrayHue': 110,
        'backgroundReplaceAllHues': false,
        'borderReplaceAllHues': false,
        'buttonReplaceAllHues': false,
        'linkReplaceAllHues': false,
        'textReplaceAllHues': false,
        'useImageHoverAnimation': false,
        'scrollbarSize': 10,
        'doNotInvertContent': false,
        'mode': 'auto',
        'modeAutoSwitchLimit': 5000,
        'includeMatches': '',
        'excludeMatches': '',
        'backgroundHueGravity': 80,
        'buttonHueGravity': 80,
        'textHueGravity': 80,
        'linkHueGravity': 80,
        'borderHueGravity': 80,
        'scrollbarStyle': 'true',
        'maxBackgroundImageSize': 500,
        'hideBigBackgroundImages': true
      }
    }
  ];
