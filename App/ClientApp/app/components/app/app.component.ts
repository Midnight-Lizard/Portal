import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ObservableMedia, MediaChange } from "@angular/flex-layout";
import { SideService, Side } from "../../services/side.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss', '../../themes/core-theme.scss']
})
export class AppComponent {
    public sidenavMode: "over" | "side" = "side";
    public sidenavIsOpened: boolean = true;
    protected _sidenavIsOpened_UserDefined = this.sidenavIsOpened;

    public toggleSidenav() {
        this._sidenavIsOpened_UserDefined = this.sidenavIsOpened = !this.sidenavIsOpened;
    }

    constructor(media: ObservableMedia,
        protected readonly execute: SideService)
    {
        execute.on(Side.Client, () => window.addEventListener("resize", () => { }));

        media.subscribe((change: MediaChange) => {
            if (/xs|sm/.test(change.mqAlias)) {
                this.sidenavIsOpened = false;
            }
            else {
                this.sidenavIsOpened = this._sidenavIsOpened_UserDefined;
            }
            if (/xs|sm/.test(change.mqAlias)) {
                this.sidenavMode = "over";
            }
            else {
                this.sidenavMode = "side";
            }
        });
    }
}
