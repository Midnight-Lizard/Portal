import { SchemesState } from './schemes.state';
import { SchemesAction, SchemesActionTypes } from './schemes.action-sets';

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

        default:
            return state;
    }
}
