import { SchemesFilters } from '../model/schemes-filters';
import { SchemesList } from '../model/schemes-lists';
import { PublicScheme } from '../model/public-scheme';

export class LoadNextSchemesChunk
{
    readonly type = 'LoadNextSchemesChunk';
    constructor() { }
}

export class NextSchemesChunkLoaded
{
    readonly type = 'NextSchemesChunkLoaded';
    constructor(readonly payload: Readonly<{
        data: PublicScheme[],
        cursor: string,
        done: boolean
    }>) { }
}

export class FirstSchemesChunkLoaded
{
    readonly type = 'FirstSchemesChunkLoaded';
    constructor(readonly payload: Readonly<{
        data: PublicScheme[],
        cursor: string,
        done: boolean
    }>) { }
}

export class SchemesSearchChanged
{
    readonly type = 'SchemesSearchChanged';
    constructor(readonly payload: Readonly<{
        filters: SchemesFilters,
        list: SchemesList
    }>) { }
}

