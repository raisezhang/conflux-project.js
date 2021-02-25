"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conflux_main_1 = require("conflux-main");
function randomBytes(seed, lower, upper) {
    if (!upper) {
        upper = lower;
    }
    if (upper === 0 && upper === lower) {
        return new Uint8Array(0);
    }
    var result = conflux_main_1.ethers.utils.arrayify(conflux_main_1.ethers.utils.keccak256(conflux_main_1.ethers.utils.toUtf8Bytes(seed)));
    while (result.length < upper) {
        result = conflux_main_1.ethers.utils.concat([result, conflux_main_1.ethers.utils.keccak256(result)]);
    }
    var top = conflux_main_1.ethers.utils.arrayify(conflux_main_1.ethers.utils.keccak256(result));
    var percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;
    return result.slice(0, lower + Math.floor((upper - lower) * percent));
}
exports.randomBytes = randomBytes;
function randomHexString(seed, lower, upper) {
    return conflux_main_1.ethers.utils.hexlify(randomBytes(seed, lower, upper));
}
exports.randomHexString = randomHexString;
function randomNumber(seed, lower, upper) {
    var top = randomBytes(seed, 3);
    var percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;
    return lower + Math.floor((upper - lower) * percent);
}
exports.randomNumber = randomNumber;
//# sourceMappingURL=random.js.map