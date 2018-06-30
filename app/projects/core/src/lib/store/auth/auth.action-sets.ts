import * as Actions from './auth.actions';
import
{
    ActionsUnion, ActionTypesUnion, CreateActionTypesEnum
} from '../../store/strong-actions';

export type AuthAction = ActionsUnion<typeof Actions>;

export type AuthActionTypes = ActionTypesUnion<typeof Actions>;

export const AuthActionTypes = CreateActionTypesEnum(Actions);

