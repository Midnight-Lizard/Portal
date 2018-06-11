import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app/app.component';
import { AppSharedModule } from './app.shared.module';

@NgModule({
  imports: [
    ServerModule, ServerTransferStateModule,
    AppSharedModule,
    NoopAnimationsModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
