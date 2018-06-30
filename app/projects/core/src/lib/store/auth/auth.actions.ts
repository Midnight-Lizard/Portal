import { User } from '../../auth/user';

export class UserChanged
{
    readonly type = 'UserChanged';
    constructor(readonly payload: {
        user: User | null
    }) { }
}

export class RefreshUser
{
    readonly type = 'RefreshUser';
    constructor(readonly payload: {
        immediately: boolean
    }) { }
}
