import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { nameOfClass } from 'testing';
import { InfoNavComponent } from './info-nav.component';

describe(nameOfClass(InfoNavComponent), () =>
{
    let component: InfoNavComponent;
    let fixture: ComponentFixture<InfoNavComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [InfoNavComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(InfoNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
