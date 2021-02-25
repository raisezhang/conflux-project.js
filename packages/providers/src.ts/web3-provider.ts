"use strict";

import { Networkish } from "@confluxproject/networks";
import { defineReadOnly } from "@confluxproject/properties";

import { Logger } from "@confluxproject/logger";
import { version } from "./_version";
const logger = new Logger(version);

import { JsonRpcProvider } from "./json-rpc-provider";

// Exported Types
export type ExternalProvider = {
    isMetaMask?: boolean;
    host?: string;
    path?: string;
    sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    request?: (request: { method: string, params?: Array<any> }) => Promise<any>
}

let _nextId = 1;

const isDBClient = (navigator && navigator.userAgent && navigator.userAgent.toLowerCase() || "").indexOf("dappbirds") > 0

export type JsonRpcFetchFunc = (method: string, params?: Array<any>) => Promise<any>;

type Web3LegacySend = (request: any, callback: (error: Error, response: any) => void) => void;

function buildWeb3LegacyFetcher(provider: ExternalProvider, sendFunc: Web3LegacySend) : JsonRpcFetchFunc {
    return function(method: string, params: Array<any>): Promise<any> {

        // Metamask complains about eth_sign (and on some versions hangs)
        if (method == "eth_sign" && provider.isMetaMask) {
            // https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign
            method = "personal_sign";
            params = [ params[1], params[0] ];
        }

        const request = {
            method: method,
            params: params,
            id: (_nextId++),
            jsonrpc: "2.0"
        };

        return new Promise((resolve, reject) => {
            sendFunc(request, function(error, result) {
                if (error) { return reject(error); }

                if (result.error) {
                    const error = new Error(result.error.message);
                    (<any>error).code = result.error.code;
                    (<any>error).data = result.error.data;
                    return reject(error);
                }

                resolve(result.result);
            });
        });
    }
}

function buildEip1193Fetcher(provider: ExternalProvider): JsonRpcFetchFunc {
    return function(method: string, params: Array<any>): Promise<any> {
        if (params == null) { params = [ ]; }

        // Metamask complains about eth_sign (and on some versions hangs)
        if (method == "eth_sign" && provider.isMetaMask) {
            // https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign
            method = "personal_sign";
            params = [ params[1], params[0] ];
        }

        return provider.request({ method, params });
    }
}

export class Web3Provider extends JsonRpcProvider {
    readonly provider: ExternalProvider;
    readonly jsonRpcFetchFunc: JsonRpcFetchFunc;

    constructor(provider: ExternalProvider | JsonRpcFetchFunc, network?: Networkish) {
        logger.checkNew(new.target, Web3Provider);

        if (provider == null) {
            logger.throwArgumentError("missing provider", "provider", provider);
        }

        let path: string = null;
        let jsonRpcFetchFunc: JsonRpcFetchFunc = null;
        let subprovider: ExternalProvider = null;

        if (typeof(provider) === "function") {
            path = "unknown:";
            jsonRpcFetchFunc = provider;

        } else {
            path = provider.host || provider.path || "";
            if (!path && provider.isMetaMask) {
                path = "metamask";
            }

            subprovider = provider;

            if (provider.request) {
                if (path === "") { path = "eip-1193:"; }
                jsonRpcFetchFunc = buildEip1193Fetcher(provider);
            } else if (provider.sendAsync) {
                jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
            } else if (provider.send) {
                jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
            } else {
                logger.throwArgumentError("unsupported provider", "provider", provider);
            }

            if (!path) { path = "unknown:"; }
        }

        super(path, network);

        defineReadOnly(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
        defineReadOnly(this, "provider", subprovider);
    }

    send(method: string, params: Array<any>): Promise<any> {
        if (!window.conflux || !window.conflux.isConfluxPortal) {
            return this.jsonRpcFetchFunc(method, params)
        }
        const { conflux } = window
        method = method.replace("eth_", "cfx_")
        method = method.replace("getTransactionCount", "getNextNonce")
        method = method.replace(/estimateGas$/, "estimateGasAndCollateral")
        method = method.replace("getBlockByNumber", "getBlockByEpochNumber")
        method = method.replace("cfx_epochNumber", "cfx_epochNumber")
        switch (method) {
        case "cfx_chainId":
            return Promise.resolve([conflux.chainId])
        case "net_version":
            return Promise.resolve([conflux.networkVersion])
        }
        // fix bugs in wallet db
        if (isDBClient && params && params.length > 0) {
            const index = params.indexOf("latest")
            if (index >= 0) {
                params[index] = "latest_state"
            }
        }
        return this.jsonRpcFetchFunc(method.replace("eth", "cfx"), params)
    }
}
