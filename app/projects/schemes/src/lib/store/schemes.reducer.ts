import { SchemesState } from './schemes.state';
import { SchemesAction, SchemesActionTypes } from './schemes.action-sets';

export function schemesReducer(state: SchemesState, action: SchemesAction): SchemesState
{
    switch (action.type)
    {
        case SchemesActionTypes.FirstSchemesChunkLoaded: {
            return { ...state, ...action.payload };
        }

        case SchemesActionTypes.NextSchemesChunkLoaded: {
            return { ...state, data: [...state.data, ...action.payload.data] };
        }

        case SchemesActionTypes.SchemesSearchChanged: {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
}
