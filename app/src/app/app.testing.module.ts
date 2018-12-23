import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgStringPipesModule } from 'ngx-pipes';
import
{
    SharedModule as PortalSharedModule,
    LoadingModule as PortalLoadingModule
} from 'dist/shared';
import
{
    CoreModule as PortalCoreModule, defaultSettings, InfoFeature,
    infoReducers, infoInitialState, ConsentService, MetaService, ConsentCookieService
} from 'core';
import { TestingModule } from 'testing';
import { rootReducers } from './store/app.state';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    imports: [
        BrowserModule,
        TestingModule.forRoot(), PortalSharedModule.forRoot(), PortalLoadingModule,
        FormsModule, ReactiveFormsModule, FlexLayoutModule, NoopAnimationsModule,
        NgStringPipesModule,
        HttpClientModule,
        StoreModule.forRoot(rootReducers),
        EffectsModule.forRoot([]),
        StoreModule.forFeature(InfoFeature, infoReducers, { initialState: infoInitialState }),

    ],
    exports: [
        PortalSharedModule, PortalLoadingModule, FormsModule,
        NgStringPipesModule, TestingModule
    ]
})
export class AppTestingModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: AppTestingModule,
            providers: [CookieService, ConsentService, ConsentCookieService,
                TestingModule.forRoot().providers!,
                { provide: 'ORIGIN_URL', useValue: '/' },
                {
                    provide: TransferState, useValue: new Map<string, any>([
                        ['settings', defaultSettings]])
                },
                {
                    provide: MetaService, useValue: {
                        updatePageMetaData: () => { }
                    }
                }
            ]
        };
    }
}
