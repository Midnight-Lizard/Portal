import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';

import { SideService } from 'core';

import { Screenshot } from '../../model/screenshot';

@Component({
    selector: 'schemes-thumbnails',
    templateUrl: './thumbnails.component.html',
    styleUrls: ['./thumbnails.component.scss']
})
export class SchemesThumbnailsComponent implements OnInit, OnDestroy
{
    hideImage = false;
    hasBeenVisible = false;
    private observer: IntersectionObserver;

    @Input()
    screenshots: Screenshot[];

    constructor(
        private readonly element: ElementRef,
        private readonly env: SideService)
    {
    }

    ngOnInit(): void
    {
        if (this.env.isBrowserSide)
        {
            if (typeof IntersectionObserver === 'function')
            {
                this.observer = new IntersectionObserver(
                    this.intersectionHandler.bind(this), {
                        threshold: 0.01
                    });
                this.observer.observe(this.element.nativeElement);
            }
            else
            {
                this.hasBeenVisible = true;
            }
        }
    }

    ngOnDestroy(): void
    {
        if (this.observer)
        {
            this.observer.disconnect();
        }
    }

    private intersectionHandler(entries: IntersectionObserverEntry[], observer: IntersectionObserver)
    {
        entries.forEach(entry =>
        {
            if (entry.isIntersecting)
            {
                this.hasBeenVisible = true;
                this.observer.disconnect();
            }
        });
    }

    onImageError()
    {
        this.hideImage = true;
    }
}
