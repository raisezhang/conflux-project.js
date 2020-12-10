"use strict";
import { AbiCoder, checkResultErrors, defaultAbiCoder, EventFragment, FormatTypes, Fragment, FunctionFragment, Indexed, Interface, LogDescription, ParamType, TransactionDescription } from "@confluxproject/abi";
import { getAddress, getCreate2Address, getContractAddress, getIcapAddress, isAddress } from "@confluxproject/address";
import * as base64 from "@confluxproject/base64";
import { Base58 as base58 } from "@confluxproject/basex";
import { arrayify, concat, hexConcat, hexDataSlice, hexDataLength, hexlify, hexStripZeros, hexValue, hexZeroPad, isBytes, isBytesLike, isHexString, joinSignature, zeroPad, splitSignature, stripZeros } from "@confluxproject/bytes";
import { _TypedDataEncoder, hashMessage, id, isValidName, namehash } from "@confluxproject/hash";
import { defaultPath, entropyToMnemonic, HDNode, isValidMnemonic, mnemonicToEntropy, mnemonicToSeed } from "@confluxproject/hdnode";
import { getJsonWalletAddress } from "@confluxproject/json-wallets";
import { keccak256 } from "@confluxproject/keccak256";
import { Logger } from "@confluxproject/logger";
import { computeHmac, ripemd160, sha256, sha512 } from "@confluxproject/sha2";
import { keccak256 as solidityKeccak256, pack as solidityPack, sha256 as soliditySha256 } from "@confluxproject/solidity";
import { randomBytes, shuffled } from "@confluxproject/random";
import { checkProperties, deepCopy, defineReadOnly, getStatic, resolveProperties, shallowCopy } from "@confluxproject/properties";
import * as RLP from "@confluxproject/rlp";
import { computePublicKey, recoverPublicKey, SigningKey } from "@confluxproject/signing-key";
import { formatBytes32String, nameprep, parseBytes32String, _toEscapedUtf8String, toUtf8Bytes, toUtf8CodePoints, toUtf8String, Utf8ErrorFuncs } from "@confluxproject/strings";
import { computeAddress, parse as parseTransaction, recoverAddress, serialize as serializeTransaction } from "@confluxproject/transactions";
import { commify, formatEther, parseEther, formatUnits, parseUnits } from "@confluxproject/units";
import { verifyMessage, verifyTypedData } from "@confluxproject/wallet";
import { _fetchData, fetchJson, poll } from "@confluxproject/web";
////////////////////////
// Enums
import { SupportedAlgorithm } from "@confluxproject/sha2";
import { UnicodeNormalizationForm, Utf8ErrorReason } from "@confluxproject/strings";
////////////////////////
// Exports
export { AbiCoder, defaultAbiCoder, Fragment, EventFragment, FunctionFragment, ParamType, FormatTypes, checkResultErrors, Logger, RLP, _fetchData, fetchJson, poll, checkProperties, deepCopy, defineReadOnly, getStatic, resolveProperties, shallowCopy, arrayify, concat, stripZeros, zeroPad, isBytes, isBytesLike, defaultPath, HDNode, SigningKey, Interface, LogDescription, TransactionDescription, base58, base64, hexlify, isHexString, hexConcat, hexStripZeros, hexValue, hexZeroPad, hexDataLength, hexDataSlice, nameprep, _toEscapedUtf8String, toUtf8Bytes, toUtf8CodePoints, toUtf8String, Utf8ErrorFuncs, formatBytes32String, parseBytes32String, hashMessage, namehash, isValidName, id, _TypedDataEncoder, getAddress, getIcapAddress, getContractAddress, getCreate2Address, isAddress, formatEther, parseEther, formatUnits, parseUnits, commify, computeHmac, keccak256, ripemd160, sha256, sha512, randomBytes, shuffled, solidityPack, solidityKeccak256, soliditySha256, splitSignature, joinSignature, parseTransaction, serializeTransaction, getJsonWalletAddress, computeAddress, recoverAddress, computePublicKey, recoverPublicKey, verifyMessage, verifyTypedData, mnemonicToEntropy, entropyToMnemonic, isValidMnemonic, mnemonicToSeed, 
////////////////////////
// Enums
SupportedAlgorithm, UnicodeNormalizationForm, Utf8ErrorReason, Indexed };
//# sourceMappingURL=utils.js.map