import { DebugElement } from '@angular/core';

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
    left: {
        button: 0,
        stopPropagation: () => true
    },
    right: {
        button: 2,
        stopPropagation: () => true
    },
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void
{
    if (el instanceof HTMLElement)
    {
        el.click();
    }
    else
    {
        el.triggerEventHandler('click', eventObj);
    }
}
