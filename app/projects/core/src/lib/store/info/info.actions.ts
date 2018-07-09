import { User } from '../../auth/user';
import { NotificationMessage } from './info.state';

export class NotifyUser
{
    readonly type = 'NotifyUser';
    constructor(readonly payload: NotificationMessage) { }
}

export class DismissNotification
{
    readonly type = 'DismissNotification';
    constructor(readonly payload: Readonly<{
        readonly id?: number
    }>) { }
}

export class DismissAllNotifications
{
    readonly type = 'DismissAllNotifications';
    constructor() { }
}
