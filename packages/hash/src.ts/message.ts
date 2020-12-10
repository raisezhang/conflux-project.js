import { Bytes, concat } from "@confluxproject/bytes";
import { keccak256 } from "@confluxproject/keccak256";
import { toUtf8Bytes } from "@confluxproject/strings";

export const messagePrefix = "\x19Ethereum Signed Message:\n";

export function hashMessage(message: Bytes | string): string {
    if (typeof(message) === "string") { message = toUtf8Bytes(message); }
    return keccak256(concat([
        toUtf8Bytes(messagePrefix),
        toUtf8Bytes(String(message.length)),
        message
    ]));
}

