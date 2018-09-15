export enum ScreenshotSize
{
    /** 640x400 */
    ExtraSmall = 'xs',
    /** 800x500 */
    Small = 'sm',
    /** 960x600 */
    Medium = 'md',
    /** 1120x700 */
    Large = 'lg',
    /** 1280x800 */
    ExtraLarge = 'xl'
}

export interface Screenshot
{
    readonly title: string;
    readonly urls: Readonly<{
        [size in ScreenshotSize]?: string
    }>;
}
