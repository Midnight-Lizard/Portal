import { OperatorFunction, Observable } from 'rxjs';

declare module '@ngrx/effects' {
    export class Actions<TAction extends ActionsUnion<TModule>, TModule extends ActionsModule> extends Observable<TAction>
    {
        ofType<T extends ActionTypesUnion<TModule>>(...allowedTypes: T[]): Actions<ActionsOfType<TModule, T>, TModule>;
    }
    export function ofType<TModule extends ActionsModule, T extends ActionTypesUnion<TModule>>(...allowedTypes: T[]):
        OperatorFunction<ActionsUnion<TModule>, ActionsOfType<TModule, T>>;
}

export declare type ActionsModule = { [className: string]: { prototype: { type: string } } };
declare type ActionWithType<Type extends string> = { type: Type };
export declare type ActionTypesUnion<TModule extends ActionsModule> = keyof TModule;
export declare type ActionsUnion<TModule extends ActionsModule> = TModule[keyof TModule]['prototype'];
export declare type ActionsOfType<TModule extends ActionsModule, T extends keyof TModule> = TModule[T]['prototype'];

/**
 * Generates enum with all action class names as properties and velues as well
 * @param fromActionsModule - reference to a module with actions like Actions from `import * as Actions from "./some.actions"`
 */
export function CreateActionTypesEnum<TModule extends ActionsModule>(fromActionsModule: TModule)
    : Readonly<{ [className in keyof TModule]: className }>
{
    const actionsEnum: any = {};
    for (const actionClassName in fromActionsModule)
    {
        (<any>actionsEnum)[actionClassName] = new (<any>(<any>
            fromActionsModule[actionClassName].prototype).constructor)().type;
    }
    return actionsEnum;
}
