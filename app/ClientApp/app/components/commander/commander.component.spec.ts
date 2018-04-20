/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CommanderComponent } from './commander.component';

let component: CommanderComponent;
let fixture: ComponentFixture<CommanderComponent>;

xdescribe('commander component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CommanderComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CommanderComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});