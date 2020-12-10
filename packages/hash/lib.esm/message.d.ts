import { Bytes } from "@confluxproject/bytes";
export declare const messagePrefix = "\u0019Ethereum Signed Message:\n";
export declare function hashMessage(message: Bytes | string): string;
