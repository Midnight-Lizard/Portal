import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthRootState } from 'core';

@Component({
    selector: 'ml-commander',
    templateUrl: './commander.component.html',
    styleUrls: ['./commander.component.scss']
})
/** commander component*/
export class CommanderComponent
{
    readonly apiForm: FormGroup;

    constructor(fb: FormBuilder,
        readonly store$: Store<AuthRootState>,
        readonly http: HttpClient)
    {
        this.apiForm = fb.group({ json: '', results: '' });
    }

    public onPublish()
    {
        this.apiForm.patchValue({ results: 'waiting results...' });
        this.store$.pipe(
            select(x => x.AUTH.user),
            take(1)
        ).subscribe(user =>
        {
            if (user)
            {
                this.http.post(
                    // "http://localhost:7008/scheme",
                    'http://192.168.1.35:30574/scheme',
                    this.apiForm.get('json')!.value,
                    {
                        headers: new HttpHeaders()
                            .set('Authorization', `Bearer ${user.access_token}`)
                            .set('api-version', '1.0')
                            .set('schema-version', '9.3.0'),
                        observe: 'response'
                    }).pipe(catchError(x => of(x)))
                    .subscribe(resp => this.apiForm
                        .patchValue({ results: JSON.stringify(resp) }));
            }
        });
    }
}
