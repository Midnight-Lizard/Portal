import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { INITIAL_STATE } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule, InjectionToken } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

import
{
    SharedModule as PortalSharedModule,
} from 'dist/shared';
import { AppComponent } from './components/app/app.component';
import { AppSharedModule } from './app.shared.module';
import { loadBrowserInitialState } from './store/app.state';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppSharedModule,
    PortalSharedModule.forRoot(),
    MatSnackBarModule,
    StoreDevtoolsModule.instrument({
      maxAge: environment.production ? 5 : 100,
      logOnly: environment.production
    })
  ],
  providers: [
    {
      provide: INITIAL_STATE,
      useFactory: loadBrowserInitialState,
      deps: [TransferState]
    },
    { provide: 'ORIGIN_URL', useValue: location.origin },
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
