import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { SideService, NotifyUser, NotificationLevel } from 'core';

import { PublicSchemeDetails, PublicSchemeId } from '../model/public-scheme';
import { ExtensionMessage, ExtensionMessageType } from './extension-messages';
import { ChromeRuntimePort } from './chrome-runtime-port';

@Injectable()
export class ExtensionService
{
    private extensionConnection?: chrome.runtime.Port;
    private readonly _installedPublicSchemes = new BehaviorSubject<PublicSchemeId[]>([]);
    public get installedPublicSchemes$() { return this._installedPublicSchemes.asObservable(); }

    constructor(
        private readonly env: SideService,
        private readonly ngZone: NgZone,
        private readonly store$: Store<{}>)
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
        this.ngZone.run(() =>
        {
            switch (message.type)
            {
                case ExtensionMessageType.PublicSchemesChanged:
                    this._installedPublicSchemes.next(message.publicSchemeIds);
                    break;

                case ExtensionMessageType.ErrorMessage:
                    this.store$.dispatch(new NotifyUser({
                        level: NotificationLevel.Error,
                        message: message.errorMessage,
                        data: message.details,
                        isLocal: true
                    }));
                    break;

                default:
                    break;
            }
        });
    }

    public installPublicScheme(publicScheme: PublicSchemeDetails)
    {
        if (this.tryOpenConnection(this.extensionConnection))
        {
            const colorScheme = { ...publicScheme.colorScheme };
            delete colorScheme.__typename;
            this.extensionConnection.postMessage({
                type: 'InstallPublicScheme',
                publicScheme: {
                    id: publicScheme.id,
                    pid: publicScheme.publisher.id,
                    gen: publicScheme.generation,
                    cs: colorScheme,
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
                    this.extensionConnection = this.createConnection(extensionId, 'portal');
                    this.extensionConnection.onMessage.addListener(this.onExtensionMessage.bind(this));
                    this.extensionConnection.onDisconnect.addListener(x => this.extensionConnection = undefined);
                    return true;
                }
                return false;
            }
            return true;
        }
        return false;
    }

    private createConnection(extensionId: string, name: string)
    {
        // if (typeof chrome !== 'object')
        // {
        return new ChromeRuntimePort(name);
        // }
        // return chrome.runtime.connect(extensionId, { name });
    }
}
