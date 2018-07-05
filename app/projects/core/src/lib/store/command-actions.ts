export interface CommandErrorPayload
{
    readonly errorMessage: string;
    readonly originalError?: any;
}

export class StandardAction<TActionType extends string, TActionPayload>
{
    type: TActionType;
    constructor(readonly payload: TActionPayload) { }
}

export interface ActionType<TActionType extends string, TActionPayload> extends Function
{
    prototype: StandardAction<TActionType, TActionPayload>;
    new(payload: TActionPayload): StandardAction<TActionType, TActionPayload>;
}

export function createCommandActions<
    TCommandName extends string, TSuccessName extends string, TFailureName extends string,
    TCommandPayload, TSuccessPayload = TCommandPayload, TFailurePayload = TCommandPayload & CommandErrorPayload>
    (options: {
        commandName: TCommandName,
        successName: TSuccessName,
        failureName: TFailureName,
        commandPayload: TCommandPayload,
        successPayload?: TSuccessPayload,
        failurePayload?: TFailurePayload
    })
{
    return [
        class {
            type = options.commandName;
            constructor(readonly payload: TCommandPayload) { }
        },
        class {
            type = options.successName;
            constructor(readonly payload: TSuccessPayload) { }
        },
        class {
            type = options.failureName;
            constructor(readonly payload: TFailurePayload) { }
        }
    ] as [
        ActionType<TCommandName, TCommandPayload>,
        ActionType<TSuccessName, TSuccessPayload>,
        ActionType<TFailureName, TFailurePayload>
    ];
}
