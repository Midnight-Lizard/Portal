import { User } from '../../auth/user';
import { System } from '../../auth/system';

export class UserChanged
{
    readonly type = 'UserChanged';
    constructor(readonly payload: User | null) { }
}

export class SystemChanged
{
    readonly type = 'SystemChanged';
    constructor(readonly payload: System | null) { }
}

export class RefreshUser
{
    readonly type = 'RefreshUser';
    constructor(readonly payload: {
        immediately: boolean
    }) { }
}

export class RefreshSystem
{
    readonly type = 'RefreshSystem';
    constructor(readonly payload: {
        immediately: boolean
    }) { }
}
