import { PublicSchemeId } from '../model/public-scheme';

export type ExtensionMessage = PublicSchemesChanged | ErrorMessage;

export enum ExtensionMessageType
{
    PublicSchemesChanged = 'PublicSchemesChanged',
    ErrorMessage = 'ErrorMessage'
}

export class PublicSchemesChanged
{
    type: ExtensionMessageType.PublicSchemesChanged = ExtensionMessageType.PublicSchemesChanged;
    constructor(readonly publicSchemeIds: PublicSchemeId[]) { }
}

export class ErrorMessage
{
    type: ExtensionMessageType.ErrorMessage = ExtensionMessageType.ErrorMessage;
    constructor(
        readonly errorMessage: string,
        readonly details: any) { }
}
