export enum ScreenshotSize
{
    // _1280x800 = '1280x800',
    // _1120x700 = '1120x700',
    // _960x600 = '960x600',
    // _800x500 = '800x500',
    // _640x400 = '640x400',
    // _480x300 = '480x300',
    ExtraSmall = 'xs',
    Small = 'sm',
    Medium = 'md',
    Large = 'lg',
    ExtraLarge = 'xl'
}

export interface Screenshot
{
    readonly title: string;
    readonly urls: Readonly<{
        [size in ScreenshotSize]?: string
    }>;
}
