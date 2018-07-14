import { Input, Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[routerLink]'
})
export class RouterLinkStubDirective
{
    @Input() routerLink: any;
    navigatedTo: any = null;

    @HostListener('(click)')
    onClick()
    {
        this.navigatedTo = this.routerLink;
    }
}
