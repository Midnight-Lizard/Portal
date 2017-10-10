import * as Actions from "./app.actions";
import { Observable } from "rxjs/Observable";

declare module "@ngrx/effects" {
    export class Actions<V> extends Observable<V>
    {
        ofType<T extends ActionFakeTypes>(...allowedTypes: T[]): Actions<ActionType<T>>;
    }
}

export declare type Action = typeof Actions[keyof typeof Actions]["prototype"];
export declare type ActionFakeTypes = keyof typeof Actions;
export type ActionType<T extends ActionFakeTypes> = typeof Actions[T]["prototype"];
export const ActionType: {[x in keyof typeof Actions]: x} = (() =>
{
    const actType = {} as any;
    let actionClassName: ActionFakeTypes;
    for (actionClassName in Actions)
    {
        (<any>actType)[actionClassName] = new (<any>(<any>
            Actions[actionClassName].prototype).constructor)().type
    }
    return actType;
})();