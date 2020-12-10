"use strict";
import sha3 from "js-sha3";
import { arrayify } from "@confluxproject/bytes";
export function keccak256(data) {
    return '0x' + sha3.keccak_256(arrayify(data));
}
//# sourceMappingURL=index.js.map