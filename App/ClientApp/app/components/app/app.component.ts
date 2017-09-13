import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ObservableMedia, MediaChange } from "@angular/flex-layout";
import { SideService, Side } from "../../../shared/side.service";

@Component({
    selector: 'ml-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{
    public sidenavMode: "over" | "side" = "side";
    public sidenavIsOpened: boolean = true;
    protected _sidenavIsOpened_UserDefined = this.sidenavIsOpened;

    public toggleSidenav()
    {
        this._sidenavIsOpened_UserDefined = this.sidenavIsOpened = !this.sidenavIsOpened;
    }

    constructor(media: ObservableMedia, readonly execute: SideService)
    {
        execute.on(Side.Client, () =>
        {
            window.addEventListener("resize", () =>
            {
                +(document.querySelector("mat-drawer-content") as HTMLDivElement).offsetLeft;
            });
            window.dispatchEvent(new Event('resize'));
        });

        media.subscribe((change: MediaChange) =>
        {
            if (/xs|sm/.test(change.mqAlias))
            {
                this.sidenavIsOpened = false;
            }
            else
            {
                this.sidenavIsOpened = this._sidenavIsOpened_UserDefined;
            }
            if (/xs|sm/.test(change.mqAlias))
            {
                this.sidenavMode = "over";
            }
            else
            {
                this.sidenavMode = "side";
            }
        });
    }
}
