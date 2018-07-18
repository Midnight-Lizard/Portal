import { NgModule, ModuleWithProviders } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';

import { RouterLinkStubDirective } from './stubs/router-link.stub';
import { RouterOutletStubComponent } from './stubs/router-outlet.stub';
import { RouterStub } from './stubs/router.stub';
import { ObservableMediaStub } from './stubs/observable-media.stub';
import { StoreModule } from '@ngrx/store';
import { ActivatedRouteStub } from './stubs/activated-route.stub';

@NgModule({
    declarations: [
        RouterLinkStubDirective,
        RouterOutletStubComponent
    ],
    imports: [],
    exports: [
        RouterLinkStubDirective,
        RouterOutletStubComponent
    ]
})
export class TestingModule
{
    static forRoot(): ModuleWithProviders
    {
        return {
            ngModule: TestingModule,
            providers: [
                { provide: 'ORIGIN_URL', useValue: '/' },
                { provide: ObservableMedia, useClass: ObservableMediaStub },
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useClass: ActivatedRouteStub }
            ]
        };
    }
}

