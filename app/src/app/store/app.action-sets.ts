import { Observable, OperatorFunction } from 'rxjs';
import { Actions } from '@ngrx/effects';
import * as Acts from './app.actions';

declare module '@ngrx/effects' {
    export class Actions<V> extends Observable<V>
    {
        ofType<T extends ActionFakeTypes>(...allowedTypes: T[]): Actions<ActionType<T>>;
    }
    export function ofType<T extends ActionFakeTypes>(...allowedTypes: T[]):
        OperatorFunction<Action, ActionType<T>>;

}

export declare type Action = typeof Acts[keyof typeof Acts]['prototype'];
export declare type ActionFakeTypes = keyof typeof Acts;
export type ActionType<T extends ActionFakeTypes> = typeof Acts[T]['prototype'];
export const ActionType: {[x in keyof typeof Acts]: x} = (() =>
{
    const actType = {} as any;
    let actionClassName: ActionFakeTypes;
    for (actionClassName in Acts)
    {
        (<any>actType)[actionClassName] = new (<any>(<any>
            Acts[actionClassName].prototype).constructor)().type;
    }
    return actType;
})();
