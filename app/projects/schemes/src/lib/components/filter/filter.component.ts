import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { SchemeSide } from '../../model/scheme-side';
import { SchemesFilters, createRouteParamsFromFilters } from '../../model/schemes-filters';
import { SchemesFeatureState, SchemesRootState } from '../../store/schemes.state';

@Component({
    selector: 'schemes-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class SchemesFilterComponent implements OnDestroy
{
    protected readonly _storeSub: Subscription;
    readonly filtersForm: FormGroup;

    constructor(router: Router, store: Store<SchemesRootState>, fb: FormBuilder)
    {
        this.filtersForm = fb.group({ name: '', side: SchemeSide.None });

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

    ngOnDestroy(): void
    {
        this._storeSub.unsubscribe();
    }
}
