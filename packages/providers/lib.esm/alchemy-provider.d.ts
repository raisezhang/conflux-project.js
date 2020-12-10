import { Network, Networkish } from "@confluxproject/networks";
import { ConnectionInfo } from "@confluxproject/web";
import { CommunityResourcable } from "./formatter";
import { WebSocketProvider } from "./websocket-provider";
import { UrlJsonRpcProvider } from "./url-json-rpc-provider";
export declare class AlchemyWebSocketProvider extends WebSocketProvider implements CommunityResourcable {
    readonly apiKey: string;
    constructor(network?: Networkish, apiKey?: any);
    isCommunityResource(): boolean;
}
export declare class AlchemyProvider extends UrlJsonRpcProvider {
    static getWebSocketProvider(network?: Networkish, apiKey?: any): AlchemyWebSocketProvider;
    static getApiKey(apiKey: any): any;
    static getUrl(network: Network, apiKey: string): ConnectionInfo;
    isCommunityResource(): boolean;
}
