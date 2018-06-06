import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'ml-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent
{
    @Output() onSidenavToggleClick = new EventEmitter<never>();
    @Output() onSignInClick = new EventEmitter<never>();

    public readonly items = new Set<{ link: string, icon: string, title: string, tooltip: string, class: string }>([
        { icon: "home", link: "/home", title: "Midnight Lizard", tooltip: "Home", class: "home-link mat-button" },
        { icon: "palette", link: "/schemes", title: "SCHEMES", tooltip: "Color schemes", class: "normal-link mat-button" },
        { icon: "book", link: "/docs", title: "DOCS", tooltip: "Documentation", class: "normal-link mat-button" },
        { icon: "bug_report", link: "/issues", title: "ISSUES", tooltip: "Bug tracker", class: "normal-link mat-button" },
        { icon: "device_hub", link: "/api", title: "API", tooltip: "Commander API", class: "normal-link mat-button" }
    ]);
}
