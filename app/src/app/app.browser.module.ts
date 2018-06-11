import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { INITIAL_STATE } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { AppSharedModule } from './app.shared.module';
import { loadInitialState } from './store/app.state';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppSharedModule,
    StoreDevtoolsModule.instrument({
      maxAge: environment.production ? 5 : 100,
      logOnly: environment.production
    })
  ],
  providers: [
    {
      provide: INITIAL_STATE,
      useFactory: loadInitialState,
      deps: [TransferState]
    },
    { provide: 'ORIGIN_URL', useValue: location.origin }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
