import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeDetailsComponent } from './details.component';
import { SchemesTestingModule } from '../../schemes.testing.module';

describe('DetailsComponent', () =>
{
    let component: SchemeDetailsComponent;
    let fixture: ComponentFixture<SchemeDetailsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SchemeDetailsComponent],
            imports: [SchemesTestingModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SchemeDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
