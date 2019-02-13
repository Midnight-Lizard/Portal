import { PublicSchemeId } from '../model/public-scheme';

export class PublicSchemeIdPayload
{
    readonly id: PublicSchemeId;
}

export class PublicSchemeSuccessPayload
{
    readonly id: PublicSchemeId;
    readonly correlationId: string;
}
