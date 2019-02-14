import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'ml-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent
{
    @Output() sidenavToggleClick = new EventEmitter<never>();

    public readonly items = new Set<{
        link: string, icon: string, class: string, badge?: string,
        toolbarTitle: string, menuTitle: string, tooltip: string
    }>([
        {
            icon: 'home', link: '/home', class: 'home-link notranslate mat-button',
            toolbarTitle: 'Midnight Lizard', menuTitle: 'Midnight Lizard', tooltip: 'Home'
        },
        {
            icon: 'palette', link: '/schemes', class: 'normal-link mat-button', badge: undefined,
            toolbarTitle: 'COLOR SCHEMES', menuTitle: 'Color Schemes', tooltip: 'Color schemes'
        },
        // { icon: 'book', link: '/docs', title: 'DOCS', tooltip: 'Documentation', class: 'normal-link mat-button' },
        // { icon: 'bug_report', link: '/issues', title: 'ISSUES', tooltip: 'Bug tracker', class: 'normal-link mat-button' },
        // { icon: 'device_hub', link: '/api', title: 'API', tooltip: 'Commander API', class: 'normal-link mat-button' }
    ]);
}
