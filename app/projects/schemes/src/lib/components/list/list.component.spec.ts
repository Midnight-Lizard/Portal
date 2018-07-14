import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollModule, InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { By } from '@angular/platform-browser';

import { SchemesListComponent } from './list.component';
import { SchemesTestingModule } from '../../schemes.testing.module';
import { SchemeDetailsComponent } from '../details/details.component';
import { ThumbnailsComponent } from '../thumbnails/thumbnails.component';

describe('SchemesListComponent', () =>
{
    let component: SchemesListComponent;
    let fixture: ComponentFixture<SchemesListComponent>;

    beforeEach(async(() =>
    {
        TestBed.overrideComponent(
            SchemesListComponent,
            {
                set: {
                    providers: [
                        { provide: 'scrollContainerSelector', useValue: undefined },
                        { provide: 'searchScrollContainerSelectorFromRoot', useValue: false }]
                }
            }
        );
        TestBed.configureTestingModule({
            declarations: [
                SchemesListComponent, SchemeDetailsComponent, ThumbnailsComponent
            ],
            imports: [SchemesTestingModule.forRoot(), InfiniteScrollModule],
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SchemesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
