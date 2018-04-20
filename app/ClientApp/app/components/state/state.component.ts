import { Component, } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { RootState } from "../../store/app.state";
import { SideService, Side } from "../../../shared/side.service";

@Component({
    selector: 'ml-state',
    template: '{{state|async}}',
    styleUrls: ['./state.component.scss']
})
/** state component*/
export class StateComponent 
{
    state: Observable<string>;

    /** state ctor */
    constructor(store$: Store<RootState>, execute: SideService)
    {
        console.log("StateComponent" + execute.side);
        execute.on(Side.Server, () => this.state = store$
            .map(s => JSON.stringify(s, null, 0)));
    }
}