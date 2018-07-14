import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailsComponent } from './thumbnails.component';
import { SchemesTestingModule } from '../../schemes.testing.module';
import { ScreenshotSize } from '../../model/screenshot';

describe('ThumbnailsComponent', () =>
{
    let component: ThumbnailsComponent;
    let fixture: ComponentFixture<ThumbnailsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [ThumbnailsComponent],
            imports: [SchemesTestingModule.forRoot()]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ThumbnailsComponent);
        component = fixture.componentInstance;
        component.screenshots = [{
            title: '', urls: {
                [ScreenshotSize._1280x800]: ''
            }
        }];
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
