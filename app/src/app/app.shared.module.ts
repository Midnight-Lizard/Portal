import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { routingComponents, AppRoutingModule } from './app.routing.module';

@NgModule({
    declarations: [
        AppComponent, ...routingComponents
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'portal' }),
        AppRoutingModule,
    ],
    providers: []
})
export class AppSharedModule { }
