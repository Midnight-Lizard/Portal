import { PublicSchemeId } from '../model/public-scheme';

export type ExtensionMessage = PublicSchemesChanged;

export enum ExtensionMessageType
{
    PublicSchemesChanged = 'PublicSchemesChanged'
}

export class PublicSchemesChanged
{
    type: ExtensionMessageType.PublicSchemesChanged = ExtensionMessageType.PublicSchemesChanged;
    constructor(readonly publicSchemeIds: PublicSchemeId[]) { }
}
