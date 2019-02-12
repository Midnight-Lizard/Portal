import { User } from '../auth/user';

export const enum ImpressionsObjectType
{
    PublicScheme = 'public-scheme'
}

export const enum ImpressionType
{
    Likes = 'likes',
    Favorites = 'favorites'
}

export const enum ImpressionAction
{
    Add = 'add',
    Remove = 'remove'
}

export interface UserImpression
{
    user: User;
    /** 'likes' | 'favorites' */
    type: ImpressionType;
    /** 'add' | 'remove' */
    action: ImpressionAction;
    object: {
        AggregateId: string;
        /** 'public-scheme' | '---' */
        ObjectType: ImpressionsObjectType;
    };
}
