import { expect as assume } from 'chai';
import
{
    TestBed, async, fakeAsync, tick,
    ComponentFixture, ComponentFixtureAutoDetect
} from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule, By } from "@angular/platform-browser";
import { CounterComponent } from './counter.component';
import { MaterialControlsModule } from '../../../shared/material.module';
import { AppTestingModule } from '../../app.module.testing';

let component: CounterComponent;
let fixture: ComponentFixture<CounterComponent>;

describe('Counter component', () =>
{
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [CounterComponent],
            imports: [
                AppTestingModule
            ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CounterComponent);
        //fixture.detectChanges();
        component = fixture.componentInstance;
    }));

    it('should display a title', async(() =>
    {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Counter');
    }));

    it('should start with count 0, then increments by 1 when clicked', fakeAsync(() =>
    {
        const countElement = fixture.debugElement.query(By.css("#currentCountInput"));
        expect(countElement.properties.value).toEqual(0, "counter has wrong assignment");

        const incrementButton = fixture.debugElement.query(By.css("button"));
        incrementButton.triggerEventHandler("click", null);
        fixture.detectChanges();
        //fixture.whenStable().then(() => expect(countElement.value).toEqual('1', "counter has not changed after click"));
        tick();
        //expect(countElement.properties.value).toEqual(1, "counter shoul increase after click");
        //assert(countElement.properties.value == 1, "counter shoul increase after click");
        //should().equal(countElement.properties.value, 1, "counter shoul increase after click");
        //assert.equal(countElement.properties.value, 1, "counter shoul increase after click");
        assume(countElement.properties.value).is.equal(1, "counter shoul increase after click");
    }));
});
