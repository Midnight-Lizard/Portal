export declare type ActionsModule = { [className: string]: { prototype: { type: string } } };
export declare type ActionTypesUnion<TModule extends ActionsModule> = keyof TModule;
export declare type ActionsUnion<TModule extends ActionsModule> = TModule[keyof TModule]['prototype'];

/**
 * Generates enum with all action class names as properties and action types as velues
 * @param fromActionsModule - reference to a module with actions like Actions from `import * as Actions from "./some.actions"`
 */
export function CreateActionTypesEnum<TModule extends ActionsModule>(fromActionsModule: TModule)
    : Readonly<{[className in keyof TModule]: TModule[className]['prototype']['type']}>
{
    const actionsEnum: any = {};
    for (const actionClassName in fromActionsModule)
    {
        (<any>actionsEnum)[actionClassName] = new (<any>(<any>
            fromActionsModule[actionClassName].prototype).constructor)().type;
    }
    return actionsEnum;
}
