import { keccak256 } from "@confluxproject/keccak256";
import { toUtf8Bytes } from "@confluxproject/strings";

export function id(text: string): string {
    return keccak256(toUtf8Bytes(text));
}
