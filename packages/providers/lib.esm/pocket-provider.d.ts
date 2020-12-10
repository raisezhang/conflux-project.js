import { Network } from "@confluxproject/networks";
import { ConnectionInfo } from "@confluxproject/web";
import { UrlJsonRpcProvider } from "./url-json-rpc-provider";
export declare class PocketProvider extends UrlJsonRpcProvider {
    readonly applicationId: string;
    readonly applicationSecretKey: string;
    static getApiKey(apiKey: any): any;
    static getUrl(network: Network, apiKey: any): ConnectionInfo;
    isCommunityResource(): boolean;
}
