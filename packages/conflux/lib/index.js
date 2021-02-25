"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js
var ethers = __importStar(require("./conflux"));
exports.ethers = ethers;
try {
    var anyGlobal = window;
    if (anyGlobal._ethers == null) {
        anyGlobal._ethers = ethers;
    }
}
catch (error) { }
var conflux_1 = require("./conflux");
exports.Signer = conflux_1.Signer;
exports.Wallet = conflux_1.Wallet;
exports.VoidSigner = conflux_1.VoidSigner;
exports.getDefaultProvider = conflux_1.getDefaultProvider;
exports.providers = conflux_1.providers;
exports.Contract = conflux_1.Contract;
exports.ContractFactory = conflux_1.ContractFactory;
exports.BigNumber = conflux_1.BigNumber;
exports.FixedNumber = conflux_1.FixedNumber;
exports.constants = conflux_1.constants;
exports.errors = conflux_1.errors;
exports.logger = conflux_1.logger;
exports.utils = conflux_1.utils;
exports.wordlists = conflux_1.wordlists;
////////////////////////
// Compile-Time Constants
exports.version = conflux_1.version;
exports.Wordlist = conflux_1.Wordlist;
//# sourceMappingURL=index.js.map