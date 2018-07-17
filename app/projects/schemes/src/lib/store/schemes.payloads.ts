import { PublicSchemeId } from '../model/public-scheme';

export class PublicSchemeIdPayload
{
    readonly id: PublicSchemeId;
}

export class PublicSchemeLikesPayload
{
    readonly id: PublicSchemeId;
    readonly likes: number;
}
