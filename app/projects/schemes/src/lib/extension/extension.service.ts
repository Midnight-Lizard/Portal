import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SideService } from 'core';
import { PublicSchemeDetails, PublicSchemeId } from '../model/public-scheme';
import { ExtensionMessage, ExtensionMessageType } from './extension-messages';

@Injectable()
export class ExtensionService
{
    private extensionConnection?: chrome.runtime.Port;
    private readonly _installedPublicSchemes = new BehaviorSubject<PublicSchemeId[]>([]);
    public get installedPublicSchemes$() { return this._installedPublicSchemes.asObservable(); }

    constructor(private readonly env: SideService)
    {
        this.tryOpenConnection();
    }

    public get isAvailable()
    {
        return this.env.isBrowserSide &&
            document.documentElement.hasAttribute('ml-is-active');
    }

    private onExtensionMessage(message: ExtensionMessage, port: chrome.runtime.Port)
    {
        switch (message.type)
        {
            case ExtensionMessageType.PublicSchemesChanged:
                this._installedPublicSchemes.next(message.publicSchemeIds);
                break;

            default:
                break;
        }
    }

    public installPublicScheme(publicScheme: PublicSchemeDetails)
    {
        if (this.tryOpenConnection(this.extensionConnection))
        {
            this.extensionConnection.postMessage({
                type: 'InstallPublicScheme',
                publicScheme: {
                    id: publicScheme.id,
                    colorScheme: publicScheme.colorScheme,
                    publisher: {
                        id: publicScheme.publisher.id,
                        name: publicScheme.publisher.name
                    }
                }
            });
        }
    }

    public uninstallPublicScheme(publicSchemeId: PublicSchemeId)
    {
        if (this.tryOpenConnection(this.extensionConnection))
        {
            this.extensionConnection.postMessage({
                type: 'UninstallPublicScheme',
                publicSchemeId: publicSchemeId
            });
        }
    }

    private tryOpenConnection(port?: chrome.runtime.Port): port is chrome.runtime.Port
    {
        if (this.env.isBrowserSide)
        {
            if (!this.extensionConnection)
            {
                const extensionId = window
                    .getComputedStyle(document.documentElement)
                    .getPropertyValue('--ml-app-id');
                if (extensionId)
                {
                    this.extensionConnection = chrome.runtime.connect(extensionId, { name: 'portal' });
                    this.extensionConnection.onMessage.addListener(this.onExtensionMessage.bind(this));
                    return true;
                }
                return false;
            }
            return true;
        }
        return false;
    }
}
