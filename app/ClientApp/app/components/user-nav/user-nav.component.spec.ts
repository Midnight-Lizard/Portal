/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { UserNavComponent } from './user-nav.component';

let component: UserNavComponent;
let fixture: ComponentFixture<UserNavComponent>;

describe('user-nav component', () =>
{
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [UserNavComponent],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(UserNavComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() =>
    {
        expect(true).toEqual(true);
    }));
});