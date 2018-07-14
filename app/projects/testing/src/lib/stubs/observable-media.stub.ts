import { Injectable } from '@angular/core';
import { MediaChange } from '@angular/flex-layout';
import
{
    Subject, NextObserver, ErrorObserver, CompletionObserver, Subscribable, Subscription
} from 'rxjs';

export type MqAlias = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx' | 'default';

@Injectable()
export class ObservableMediaStub implements Subscribable<MediaChange>
{
    protected readonly _mediaChangeSubject = new Subject<MediaChange>();

    public readonly subscribe
        : (next?: (value: MediaChange) => void, error?: (error: any) => void, complete?: () => void) => Subscription
        = this._mediaChangeSubject.subscribe.bind(this._mediaChangeSubject);

    public changeMedia(newMedia: MqAlias)
    {
        this._mediaChangeSubject.next(new MediaChange(true, newMedia, newMedia, newMedia));
    }
}
