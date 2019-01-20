import { Injectable } from '@angular/core';
import { MediaChange } from '@angular/flex-layout';
import
{
    Subject, NextObserver, ErrorObserver, CompletionObserver,
    Subscribable, Subscription, BehaviorSubject, Observable,
    PartialObserver
} from 'rxjs';

export type MqAlias = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xx' | 'default';

@Injectable()
export class ObservableMediaStub
{
    get media$() { return this._mediaChangeSubject.asObservable(); }

    protected readonly _mediaChangeSubject = new BehaviorSubject<MediaChange>(new MediaChange(true, 'lg', 'lg', 'lg'));

    public changeMedia(newMedia: MqAlias)
    {
        this._mediaChangeSubject.next(new MediaChange(true, newMedia, newMedia, newMedia));
    }
}
