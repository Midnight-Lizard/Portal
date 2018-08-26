import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgStringPipesModule } from 'ngx-pipes';
import
{
    SharedModule as PortalSharedModule,
    LoadingModule as PortalLoadingModule
} from 'dist/shared';
import { CoreModule as PortalCoreModule } from 'core';
import { AppComponent } from './components/app/app.component';
import { routingComponents, AppRoutingModule } from './app.routing.module';
import { AppEffects } from './store/app.effects';
import { rootReducers } from './store/app.state';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { DetailsBarComponent } from './components/details-bar/details-bar.component';
import { InfoNavComponent } from './components/info-nav/info-nav.component';

@NgModule({
    declarations: [
        AppComponent, routingComponents,
        UserNavComponent,
        ToolbarComponent,
        FooterComponent,
        InfoBarComponent,
        DetailsBarComponent,
        InfoNavComponent
    ],
    entryComponents: [InfoBarComponent, DetailsBarComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'portal' }),
        PortalSharedModule.forRoot(),
        AppRoutingModule, PortalCoreModule, PortalLoadingModule,
        FormsModule, ReactiveFormsModule, FlexLayoutModule,
        NgStringPipesModule,
        HttpClientModule,
        StoreRouterConnectingModule.forRoot(),
        StoreModule.forRoot(rootReducers),
        EffectsModule.forRoot([AppEffects]),
    ],
    providers: [],
})
export class AppSharedModule
{
}
