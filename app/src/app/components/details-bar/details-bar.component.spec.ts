import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { nameOfClass } from 'testing';
import { DetailsBarComponent } from './details-bar.component';

describe(nameOfClass(DetailsBarComponent), () =>
{
    let component: DetailsBarComponent;
    let fixture: ComponentFixture<DetailsBarComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [DetailsBarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(DetailsBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
