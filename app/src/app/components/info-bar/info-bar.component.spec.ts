import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { nameOfClass } from 'testing';
import { InfoBarComponent } from './info-bar.component';

describe(nameOfClass(InfoBarComponent), () =>
{
    let component: InfoBarComponent;
    let fixture: ComponentFixture<InfoBarComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [InfoBarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(InfoBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
