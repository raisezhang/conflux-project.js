import { keccak256 } from "@confluxproject/keccak256";
import { toUtf8Bytes } from "@confluxproject/strings";
export function id(text) {
    return keccak256(toUtf8Bytes(text));
}
//# sourceMappingURL=id.js.map