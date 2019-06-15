import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingComponent } from './normal/loading.component';
import { ReloadFromServerComponent } from './server/reload-from-server.component';

const publicComponents = [
    LoadingComponent, ReloadFromServerComponent
];

@NgModule({
    declarations: [
        publicComponents
    ],
    imports: [
        MatProgressSpinnerModule,
    ],
    exports: [
        publicComponents
    ]
})
export class LoadingModule { }
