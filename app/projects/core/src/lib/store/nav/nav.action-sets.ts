import * as Actions from './nav.actions';
import
{
    ActionsUnion, ActionTypesUnion, CreateActionTypesEnum
} from '../strong-actions';

export type NavAction = ActionsUnion<typeof Actions>;

export type NavActionTypes = ActionTypesUnion<typeof Actions>;

export const NavActionTypes = CreateActionTypesEnum(Actions);

