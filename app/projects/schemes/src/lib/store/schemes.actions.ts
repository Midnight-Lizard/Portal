import { createCommandActions, ActionType, StandardAction } from 'core';
import { SchemesFilters } from '../model/schemes-filters';
import { SchemesList } from '../model/schemes-lists';
import { PublicScheme, PublicSchemeDetails } from '../model/public-scheme';
import { PublicSchemeIdPayload, PublicSchemeLikesPayload } from './schemes.payloads';

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

export class CurrentSchemeChanged
{
    readonly type = 'CurrentSchemeChanged';
    constructor(readonly payload: Readonly<{
        currentScheme: PublicSchemeDetails
    }>) { }
}

export const [LikeScheme, SchemeLiked, LikeSchemeFailed] = createCommandActions({
    commandName: 'LikeScheme',
    successName: 'SchemeLiked',
    failureName: 'LikeSchemeFailed',
    commandPayload: new PublicSchemeIdPayload(),
    successPayload: new PublicSchemeLikesPayload()
});

export const [DislikeScheme, SchemeDisliked, DislikeSchemeFailed] = createCommandActions({
    commandName: 'DislikeScheme',
    successName: 'SchemeDisliked',
    failureName: 'DislikeSchemeFailed',
    commandPayload: new PublicSchemeIdPayload(),
    successPayload: new PublicSchemeLikesPayload()
});

export const [AddSchemeToFavorites, SchemeAddedToFavorites, AddSchemeToFavoritesFailed] = createCommandActions({
    commandName: 'AddSchemeToFavorites',
    successName: 'SchemeAddedToFavorites',
    failureName: 'AddSchemeToFavoritesFailed',
    commandPayload: new PublicSchemeIdPayload()
});

export const [RemoveSchemeFromFavorites, SchemeRemovedFromFavorites, RemoveSchemeFromFavoritesFailed] = createCommandActions({
    commandName: 'RemoveSchemeFromFavorites',
    successName: 'SchemeRemovedFromFavorites',
    failureName: 'RemoveSchemeFromFavoritesFailed',
    commandPayload: new PublicSchemeIdPayload()
});
