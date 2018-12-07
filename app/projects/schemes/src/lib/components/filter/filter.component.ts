import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { SchemeSide } from '../../model/scheme-side';
import { SchemesFilters, createRouteParamsFromFilters } from '../../model/schemes-filters';
import { SchemesFeatureState, SchemesRootState } from '../../store/schemes.state';
import { ObservableMedia } from '@angular/flex-layout';
import { MatButtonToggleGroup, MatInput } from '@angular/material';

@Component({
    selector: 'schemes-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class SchemesFilterComponent implements OnDestroy
{
    private readonly _storeSub: Subscription;
    private readonly _mediaSub: Subscription;
    readonly filtersForm: FormGroup;
    @ViewChild(MatButtonToggleGroup) sideToggle: MatButtonToggleGroup;
    @ViewChild(MatInput) searchField: MatInput;

    constructor(
        router: Router, fb: FormBuilder,
        store: Store<SchemesRootState>,
        media: ObservableMedia)
    {
        this.filtersForm = fb.group({
            query: '', side: SchemeSide.None
        } as SchemesFilters);

        this._storeSub = store.pipe(select(s => s.SCHEMES.schemes.filters))
            .subscribe(filters =>
            {
                this.filtersForm.reset(filters, { emitEvent: false });
            });

        this.filtersForm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((filters: SchemesFilters) =>
            {
                const params = createRouteParamsFromFilters(filters);
                router.navigate([], { queryParams: params, queryParamsHandling: 'merge' });
            });

        this._mediaSub = media.subscribe(change =>
        {
            const isSmall = change.matches && change.mqAlias === 'sm';
            if (this.sideToggle)
            {
                this.sideToggle.vertical = isSmall;
            }
            if (this.searchField)
            {
                this.searchField.placeholder = isSmall
                    ? 'Search' : 'Search query';
            }
        });
    }

    ngOnDestroy(): void
    {
        this._storeSub.unsubscribe();
        this._mediaSub.unsubscribe();
    }
}
