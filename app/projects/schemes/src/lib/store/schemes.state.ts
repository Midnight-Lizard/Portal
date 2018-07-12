import { ActionReducerMap } from '@ngrx/store';

import { schemesReducer } from './schemes.reducer';
import { PublicScheme, PublicSchemeDetails } from '../model/public-scheme';
import { SchemesFilters } from '../model/schemes-filters';
import { SchemeSide } from '../model/scheme-side';
import { SchemesList } from '../model/schemes-lists';

export const SchemesFeature: keyof SchemesRootState = 'SCHEMES';

export interface SchemesRootState
{
    SCHEMES: SchemesFeatureState;
}

export interface SchemesFeatureState
{
    schemes: SchemesState;
}

export interface SchemesState
{
    readonly list: SchemesList;
    readonly data: PublicScheme[];
    readonly filters: SchemesFilters;
    readonly currentScheme?: PublicSchemeDetails;
    readonly cursor?: string;
    readonly done: boolean;
}

export const schemesReducers: ActionReducerMap<SchemesFeatureState> = {
    schemes: schemesReducer
};

export const schemesInitialState: SchemesFeatureState = {
    schemes: {
        list: SchemesList.Empty,
        filters: {
            name: '',
            side: SchemeSide.None
        },
        data: [],
        done: false
    }
};
