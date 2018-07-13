import { TestBed, fakeAsync, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserNavComponent } from './user-nav.component';
import { AppTestingModule } from '../../app.module.testing';

let component: UserNavComponent;
let fixture: ComponentFixture<UserNavComponent>;

describe('user-nav component', () =>
{
    beforeEach(fakeAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations: [UserNavComponent],
            imports: [AppTestingModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(UserNavComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', fakeAsync(() =>
    {
        expect(true).toEqual(true);
    }));
});