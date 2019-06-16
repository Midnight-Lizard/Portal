import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { nameOfClass, TestingModule } from 'testing';
import { SchemeSliderComponent } from './slider.component';
import { SchemesTestingModule } from '../../schemes.testing.module';
import { ScreenshotSize } from '../../model/screenshot';

describe(nameOfClass(SchemeSliderComponent), () =>
{
    let component: SchemeSliderComponent;
    let fixture: ComponentFixture<SchemeSliderComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SchemeSliderComponent],
            imports: [SchemesTestingModule.forRoot(), TestingModule.forRoot()]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SchemeSliderComponent);
        component = fixture.componentInstance;
        component.screenshots = [{
            title: '', urls: {
                [ScreenshotSize.Small]: ''
            }
        }];
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
