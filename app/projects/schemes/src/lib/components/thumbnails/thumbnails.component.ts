import { Component, OnInit, Input } from '@angular/core';
import { Router, } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { PublicScheme } from '../../model/public-scheme';

@Component({
    selector: 'schemes-thumbnails',
    templateUrl: './thumbnails.component.html',
    styleUrls: ['./thumbnails.component.scss']
})
export class ThumbnailsComponent
{
    @Input()
    scheme: PublicScheme;

    constructor() { }
}
