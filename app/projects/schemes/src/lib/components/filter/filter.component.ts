import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { SchemeSide } from '../../model/scheme-side';
import { SchemesFilters, createRouteParamsFromFilters } from '../../model/schemes-filters';
import { SchemesRootState } from '../../store/schemes.state';
import { ObservableMedia } from '@angular/flex-layout';
import { MatButtonToggleGroup, MatInput } from '@angular/material';

@Component({
    selector: 'schemes-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class SchemesFilterComponent implements OnDestroy, AfterViewInit
{
    private readonly _storeSub: Subscription;
    private _mediaSub: Subscription;
    readonly filtersForm: FormGroup;
    @ViewChildren(MatButtonToggleGroup) toggles: QueryList<MatButtonToggleGroup>;
    @ViewChild(MatInput) searchField: MatInput;

    constructor(
        router: Router, fb: FormBuilder,
        store: Store<SchemesRootState>,
        private readonly media: ObservableMedia)
    {
        this.filtersForm = fb.group({
            query: '', side: SchemeSide.Any, bg: 'any'
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
    }

    ngAfterViewInit(): void
    {
        this._mediaSub = this.media.subscribe(change =>
        {
            const isSmall = change.matches && change.mqAlias === 'sm';
            if (this.toggles)
            {
                this.toggles.forEach(x => x.vertical = isSmall);
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
        if (this._storeSub)
        {
            this._storeSub.unsubscribe();
        }
        if (this._mediaSub)
        {
            this._mediaSub.unsubscribe();
        }
    }
}
