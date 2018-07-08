import { User } from '../../auth/user';
import { NotificationMessage } from './info.state';

export class NotifyUser
{
    readonly type = 'NotifyUser';
    constructor(readonly payload: NotificationMessage) { }
}
