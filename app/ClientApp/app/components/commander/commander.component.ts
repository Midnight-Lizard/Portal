import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootState } from '../../store/app.state';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

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
        readonly store$: Store<RootState>,
        readonly http: HttpClient)
    {
        this.apiForm = fb.group({ json: '', results: "" });
    }

    public onPublish()
    {
        this.apiForm.patchValue({ results: "waiting results..." });
        this.store$.select(x => x.ML.user)
            .take(1)
            .subscribe(user =>
            {
                if (user)
                {
                    this.http.post(
                        //"http://localhost:7008/scheme",
                        "http://192.168.1.44:30955/scheme",
                        this.apiForm.get("json")!.value,
                        {
                            headers: new HttpHeaders()
                                .set("Authorization", `Bearer ${user.access_token}`)
                                .set("api-version", "1.3"),
                            observe: "response"
                        })
                        .catch(x => of(x))
                        .subscribe(resp => this.apiForm
                            .patchValue({ results: JSON.stringify(resp) }))
                }
            });
    }
}