import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { nameOfClass } from 'testing';
import { UserNavComponent } from './user-nav.component';
import { AppTestingModule } from '../../app.testing.module';

describe(nameOfClass(UserNavComponent), () =>
{
    let component: UserNavComponent;
    let fixture: ComponentFixture<UserNavComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [UserNavComponent],
            imports: [AppTestingModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(UserNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
