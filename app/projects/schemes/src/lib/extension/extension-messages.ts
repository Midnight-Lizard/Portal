import { PublicSchemeId } from '../model/public-scheme';

export type ExtensionMessage = PublicSchemesChanged | ErrorMessage | GetInstalledPublicSchemes;

export enum ExtensionMessageType
{
    PublicSchemesChanged = 'PublicSchemesChanged',
    ErrorMessage = 'ErrorMessage',
    GetInstalledPublicSchemes = 'GetInstalledPublicSchemes'
}

export class GetInstalledPublicSchemes
{
    type: ExtensionMessageType.GetInstalledPublicSchemes = ExtensionMessageType.GetInstalledPublicSchemes;
    constructor() { }
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
