import * as Actions from './app.actions';
import
{
    ActionsUnion, ActionTypesUnion, CreateActionTypesEnum
} from 'core';

export type AppAction = ActionsUnion<typeof Actions>;

export type AppActionTypes = ActionTypesUnion<typeof Actions>;

export const AppActionTypes = CreateActionTypesEnum(Actions);

