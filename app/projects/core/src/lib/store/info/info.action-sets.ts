import * as Actions from './info.actions';
import
{
    ActionsUnion, ActionTypesUnion, CreateActionTypesEnum
} from '../../store/strong-actions';

export type InfoAction = ActionsUnion<typeof Actions>;

export type InfoActionTypes = ActionTypesUnion<typeof Actions>;

export const InfoActionTypes = CreateActionTypesEnum(Actions);

