import * as Actions from './schemes.actions';
import
{
    ActionsUnion, ActionTypesUnion, CreateActionTypesEnum
} from 'core';

export type SchemesAction = ActionsUnion<typeof Actions>;

export type SchemesActionTypes = ActionTypesUnion<typeof Actions>;

export const SchemesActionTypes = CreateActionTypesEnum(Actions);

