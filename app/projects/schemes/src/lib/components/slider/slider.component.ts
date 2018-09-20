import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Screenshot } from '../../model/screenshot';

declare type SliderState = { current: number };

@Component({
    selector: 'schemes-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SchemeSliderComponent
{
    current = 0;

    @Input()
    screenshots: Screenshot[];
    readonly navForm: FormGroup;

    constructor(fb: FormBuilder)
    {
        this.navForm = fb.group({ current: 0 } as SliderState);

        this.navForm.valueChanges
            .subscribe((state: SliderState) =>
            {
                this.current = state.current;
            });
    }

    goToNext()
    {
        this.navForm.reset({
            current: (this.current + 1) % (this.screenshots.length)
        } as SliderState);
    }

    goToPrev()
    {
        this.navForm.reset({
            current: this.current ? this.current - 1 : this.screenshots.length - 1
        } as SliderState);
    }
}
