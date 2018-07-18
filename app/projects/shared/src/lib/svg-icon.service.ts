import { Injectable, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { SideService } from 'core';

const svgIcons = [
    { key: 'midnight-lizard', path: 'assets/ml-logo.svg' },
    { key: 'outline-thumb-up', path: 'assets/outline-thumb_up.svg' },
    { key: 'mark-as-read', path: 'assets/mark-as-read.svg' }
];

@Injectable()
export class SvgIconService
{
    constructor(
        private readonly env: SideService,
        @Inject('ORIGIN_URL')
        private readonly baseUrl: string,
        private readonly sanitizer: DomSanitizer,
        private readonly iconRegistry: MatIconRegistry)
    {

    }

    public registerSvgIcons()
    {
        const pathPrefix = this.env.isServerSide ? this.baseUrl : '';
        for (const icon of svgIcons)
        {
            this.iconRegistry.addSvgIcon(
                icon.key,
                this.sanitizer.bypassSecurityTrustResourceUrl(
                    this.urlJoin(pathPrefix, icon.path)));
        }
    }

    private urlJoin(...urlParts: string[])
    {
        return urlParts.map(p => p.replace(/^\/|\/$/g, '').trim()).join('/');
    }
}
