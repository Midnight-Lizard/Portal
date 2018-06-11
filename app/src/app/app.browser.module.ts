import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { INITIAL_STATE } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { AppSharedModule } from './app.shared.module';
import { loadInitialState } from './store/app.state';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppSharedModule,
  ],
  providers: [
    {
      provide: INITIAL_STATE,
      useFactory: loadInitialState,
      deps: [TransferState]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
