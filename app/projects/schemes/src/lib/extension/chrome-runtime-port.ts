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

        window.addEventListener('message', (msg) =>
        {
            if (msg.data.fromPolyfillOnExtensionSide)
            {
                this.onMessageHandlers.forEach(handler => handler(msg.data, this));
            }
        });

        this.postMessage({ type: 'connect' });
    }

    public postMessage(message: any)
    {
        message.fromPolyfillOnPortalSide = true;
        window.postMessage(message, '*');
    }

    public disconnect() { }
}


