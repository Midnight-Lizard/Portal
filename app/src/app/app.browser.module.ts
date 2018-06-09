import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { AppSharedModule } from './app.shared.module';

@NgModule({
  imports: [
    AppSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
