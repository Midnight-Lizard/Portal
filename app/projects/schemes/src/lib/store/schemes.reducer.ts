import { SchemesState } from './schemes.state';
import { SchemesAction, SchemesActionTypes } from './schemes.action-sets';
import { PublicScheme, PublicSchemeId } from '../model/public-scheme';

export function schemesReducer(state: SchemesState, action: SchemesAction): SchemesState
{
    switch (action.type)
    {
        case SchemesActionTypes.FirstSchemesChunkLoaded: {
            return {
                ...state,
                ...action.payload
            };
        }

        case SchemesActionTypes.NextSchemesChunkLoaded: {
            return {
                ...state,
                data: [...state.data, ...action.payload.data],
                done: action.payload.done,
                cursor: action.payload.cursor
            };
        }

        case SchemesActionTypes.SchemesSearchChanged: {
            return {
                ...state,
                ...action.payload,
                done: false
            };
        }

        case SchemesActionTypes.LikeScheme: {
            return updateScheme(state, action.payload.id, scheme => ({
                liked: true,
                likes: scheme.likes + 1
            }));
        }

        case SchemesActionTypes.LikeSchemeFailed: {
            return updateScheme(state, action.payload.id, scheme => ({
                liked: false,
                likes: scheme.likes - 1
            }));
        }

        case SchemesActionTypes.SchemeLiked: {
            return updateScheme(state, action.payload.id, {
                liked: true,
                likes: action.payload.likes
            });
        }

        case SchemesActionTypes.DislikeScheme: {
            return updateScheme(state, action.payload.id, scheme => ({
                liked: false,
                likes: scheme.likes - 1
            }));
        }

        case SchemesActionTypes.DislikeSchemeFailed: {
            return updateScheme(state, action.payload.id, scheme => ({
                liked: true,
                likes: scheme.likes + 1
            }));
        }

        case SchemesActionTypes.SchemeDisliked: {
            return updateScheme(state, action.payload.id, {
                liked: false,
                likes: action.payload.likes
            });
        }

        case SchemesActionTypes.AddSchemeToFavorites:
        case SchemesActionTypes.SchemeAddedToFavorites: {
            return updateScheme(state, action.payload.id, {
                favorited: true
            });
        }

        case SchemesActionTypes.AddSchemeToFavoritesFailed: {
            return updateScheme(state, action.payload.id, {
                favorited: false
            });
        }

        case SchemesActionTypes.RemoveSchemeFromFavorites:
        case SchemesActionTypes.SchemeRemovedFromFavorites: {
            return updateScheme(state, action.payload.id, {
                favorited: false
            });
        }

        case SchemesActionTypes.RemoveSchemeFromFavoritesFailed: {
            return updateScheme(state, action.payload.id, {
                favorited: true
            });
        }

        default:
            return state;
    }
}

function updateScheme(state: SchemesState, id: PublicSchemeId,
    update: Partial<PublicScheme> | ((scheme: PublicScheme) => Partial<PublicScheme>))
{
    const index = state.data.findIndex(s => s.id === id);
    if (index !== -1)
    {
        const dataClone = [...state.data];
        if (typeof (update) === 'function')
        {
            update = update(dataClone[index]);
        }
        dataClone[index] = { ...dataClone[index], ...update };
        return { ...state, data: dataClone };
    }
    return state;
}
