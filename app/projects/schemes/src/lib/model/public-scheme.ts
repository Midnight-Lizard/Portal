import { Publisher } from './publisher';
import { SchemeSide } from './scheme-side';
import { Screenshot } from './screenshot';

export declare type PublicSchemeId = string;

export interface PublicScheme
{
    readonly id: PublicSchemeId;
    readonly publisher: Publisher;
    readonly side: SchemeSide;
    readonly name: string;
    readonly screenshots: Screenshot[];
    readonly liked: boolean;
    readonly likes: number;
    readonly favorited: boolean;
}
