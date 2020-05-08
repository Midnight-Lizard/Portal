import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Store } from '@ngrx/store';

import { SettingsService, AuthRootState } from 'core';
import { SchemesService } from './schemes.service';
import { StandAloneSchemesService } from './schemes.service.stand-alone';

export function getSchemesService(
    httpLink: HttpLink, store$: Store<AuthRootState>,
    settingsService: SettingsService, apollo: Apollo)
{
    if (settingsService.getSettings().IS_STAND_ALONE)
    {
        return new StandAloneSchemesService();
    }
    else
    {
        return new SchemesService(httpLink, store$, settingsService, apollo);
    }
}