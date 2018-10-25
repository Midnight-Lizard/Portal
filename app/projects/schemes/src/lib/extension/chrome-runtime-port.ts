declare type Port = chrome.runtime.Port;

export class ChromeRuntimePort implements Port
{
    sender?: chrome.runtime.MessageSender | undefined;
    onDisconnect: chrome.runtime.PortDisconnectEvent;
    onMessage: chrome.runtime.PortMessageEvent;

    onMessageHandlers = new Set<(message: any, port: Port) => void>();

    constructor(readonly name: string)
    {
        this.onMessage = {
            addListener: (onMessageHandler: (message: any, port: Port) => void) =>
            {
                this.onMessageHandlers.add(onMessageHandler);
            },
            removeListener: (onMessageHandler: (message: any, port: Port) => void) =>
            {
                this.onMessageHandlers.delete(onMessageHandler);
            }
        } as any;

        this.onDisconnect = {
            addListener: (onDisconnectHandler: (port: Port) => void) => { },
            removeListener: (onDisconnectHandler: (port: Port) => void) => { }
        } as any;

        document.documentElement.addEventListener('message-from-extension', e =>
        {
            if (e instanceof CustomEvent && e.detail)
            {
                this.onMessageHandlers.forEach(handler => handler(JSON.parse(e.detail), this));
            }
        });

        this.postMessage({ type: 'connect' });
    }

    public postMessage<TMessage>(message: TMessage)
    {
        document.documentElement.dispatchEvent(
            new CustomEvent('message-from-portal', {
                detail: JSON.stringify(message)
            }));
    }

    public disconnect() { }
}


