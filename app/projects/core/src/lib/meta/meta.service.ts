import { Meta, Title } from '@angular/platform-browser';
import { MetaData } from './meta-data';
import { SettingsService } from '../settings/settings.service';

export class MetaService
{
    private readonly dafaultMetaData: Required<MetaData>;

    constructor(settingsService: SettingsService,
        private readonly metaService: Meta,
        private readonly titleService: Title)
    {
        let baseUrl = settingsService.getSettings().PORTAL_URL;
        if (baseUrl.endsWith('/'))
        {
            baseUrl = baseUrl.substr(0, baseUrl.length - 1);
        }
        this.dafaultMetaData = {
            title: 'Midnight Lizard',
            description: 'Custom color schemes for all websites',
            image: `${baseUrl}/assets/ml-logo-square.png`
        };
        this.createDefaultPageMetaData();
    }

    private createDefaultPageMetaData()
    {
        this.titleService.setTitle('Midnight Lizard');
        this.metaService.addTags([
            // Standard
            { name: 'description', content: this.dafaultMetaData.description },
            { name: 'og:description', content: this.dafaultMetaData.description },

            // Open Graph
            { name: 'og:type', content: 'website' },
            { name: 'og:site_name', content: 'Midnight Lizard' },
            { name: 'og:title', content: this.dafaultMetaData.title },
            { name: 'og:description', content: this.dafaultMetaData.description },
            { name: 'og:image', content: this.dafaultMetaData.image },
            { name: 'og:image:alt', content: 'image' },
            { name: 'og:image:secure_url', content: this.dafaultMetaData.image },

            // Twitter
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@MidnightLizard' },
            { name: 'twitter:title', content: this.dafaultMetaData.title },
            { name: 'twitter:description', content: this.dafaultMetaData.description },
            { name: 'twitter:image', content: this.dafaultMetaData.image },
        ]);
    }

    public updatePageMetaData(metaData: MetaData)
    {
        const title = metaData.title || this.dafaultMetaData.title,
            description = metaData.description || metaData.title || this.dafaultMetaData.description,
            image = metaData.image || this.dafaultMetaData.image;

        // Standard
        this.titleService.setTitle(metaData.title || 'Midnight Lizard');
        this.metaService.updateTag({ name: 'description', content: description });

        // Open Graph
        this.metaService.updateTag({ name: 'og:title', content: title });
        this.metaService.updateTag({ name: 'og:description', content: description });
        this.metaService.updateTag({ name: 'og:image', content: image });
        this.metaService.updateTag({ name: 'og:image:secure_url', content: image });

        // Twitter
        this.metaService.updateTag({
            name: 'twitter:card',
            content: metaData.image ? 'summary_large_image' : 'summary'
        });
        this.metaService.updateTag({ name: 'twitter:title', content: title.substr(0, 70) });
        this.metaService.updateTag({ name: 'twitter:description', content: description.substr(0, 200) });
        this.metaService.updateTag({ name: 'twitter:image', content: image });
    }
}
