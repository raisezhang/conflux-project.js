"use strict";
import { Contract, ContractFactory } from "@confluxproject/contracts";
import { BigNumber, FixedNumber } from "@confluxproject/bignumber";
import { Signer, VoidSigner } from "@confluxproject/abstract-signer";
import { Wallet } from "@confluxproject/wallet";
import * as constants from "@confluxproject/constants";
import * as providers from "@confluxproject/providers";
import { getDefaultProvider } from "@confluxproject/providers";
import { Wordlist, wordlists } from "@confluxproject/wordlists";
import * as utils from "./utils";
import { ErrorCode as errors, Logger } from "@confluxproject/logger";
////////////////////////
// Compile-Time Constants
// This is generated by "npm run dist"
import { version } from "./_version";
const logger = new Logger(version);
////////////////////////
// Exports
export { Signer, Wallet, VoidSigner, getDefaultProvider, providers, Contract, ContractFactory, BigNumber, FixedNumber, constants, errors, logger, utils, wordlists, 
////////////////////////
// Compile-Time Constants
version, Wordlist };
//# sourceMappingURL=ethers.js.map