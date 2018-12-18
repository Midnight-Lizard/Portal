import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

import { PublicSchemeDetails, PublicSchemeId } from '../model/public-scheme';

@Injectable()
export class ExtensionServiceStub
{
    public get installedPublicSchemes$() { return new Subject<PublicSchemeId[]>(); }

    constructor()
    {
    }

    public get isAvailable()
    {
        return false;
    }

    public installPublicScheme(publicScheme: PublicSchemeDetails)
    {
    }

    public uninstallPublicScheme(publicSchemeId: PublicSchemeId)
    {
    }
}
