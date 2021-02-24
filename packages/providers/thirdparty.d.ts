declare module "ws" {
    export interface WebSocker {
        send(): void;
        onopen: () => void;
        onmessage: (messageEvent: { target: any, type: string, data: string }) => void
    }

    export default WebSocket;
}

interface Window {
    conflux?: {
        chainId?: string
        networkVersion?: string
        isConfluxPortal?: true
        on?: (...args: any[]) => void
        removeListener?: (...args: any[]) => void
    }
}

