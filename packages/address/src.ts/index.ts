"use strict";

import { arrayify, BytesLike, concat, hexDataLength, hexDataSlice, isHexString, stripZeros } from "@confluxproject/bytes";
import { BigNumber, BigNumberish, _base16To36, _base36To16 } from "@confluxproject/bignumber";
import { keccak256 } from "@confluxproject/keccak256";
import { encode } from "@confluxproject/rlp";
// @ts-ignore
import { decode as confluxAddressDecode, encode as confluxAddressEncode } from 'conflux-address-js';

import { Logger } from "@confluxproject/logger";
import { version } from "./_version";
const logger = new Logger(version);

export function isLikeHex40Address(address: string): boolean {
    return /^0x[0-9a-fA-F]{40}$/.test(address)
}

export function isLikeBase32Address(address: string): boolean {
    // this won't return false when there's net1029, net1
    return /^(cfx(test)?|net\d+):(type\.(null|user|contract|builtin):)?[0123456789abcdefghjkmnprstuvwxyz]{42}$/i.test(
      address
    )
}

export function getBase32AddressFromHex40(address: string, chainId: number | undefined): string {
    if (isLikeBase32Address(address)) {
        return address
    }
    const hexBuffer = Buffer.from(address.slice(2), 'hex');
    return confluxAddressEncode(hexBuffer, chainId)
}

export function getHex40AddressFromBase32(address: string): string {
    if (isLikeHex40Address(address)) {
        return address
    }
    return getChecksumAddress(`0x${confluxAddressDecode(address).hexAddress.toString('hex')}`)
}

function getChecksumAddress(address: string): string {
    if (!isHexString(address, 20)) {
        logger.throwArgumentError("invalid address", "address", address);
    }

    address = address.toLowerCase();

    const chars = address.substring(2).split("");

    const expanded = new Uint8Array(40);
    for (let i = 0; i < 40; i++) {
        expanded[i] = chars[i].charCodeAt(0);
    }

    const hashed = arrayify(keccak256(expanded));

    for (let i = 0; i < 40; i += 2) {
        if ((hashed[i >> 1] >> 4) >= 8) {
            chars[i] = chars[i].toUpperCase();
        }
        if ((hashed[i >> 1] & 0x0f) >= 8) {
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }

    return "0x" + chars.join("");
}

// Shims for environments that are missing some required constants and functions
const MAX_SAFE_INTEGER: number = 0x1fffffffffffff;

function log10(x: number): number {
    if (Math.log10) { return Math.log10(x); }
    return Math.log(x) / Math.LN10;
}


// See: https://en.wikipedia.org/wiki/International_Bank_Account_Number

// Create lookup table
const ibanLookup: { [character: string]: string } = { };
for (let i = 0; i < 10; i++) { ibanLookup[String(i)] = String(i); }
for (let i = 0; i < 26; i++) { ibanLookup[String.fromCharCode(65 + i)] = String(10 + i); }

// How many decimal digits can we process? (for 64-bit float, this is 15)
const safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));

function ibanChecksum(address: string): string {
    address = address.toUpperCase();
    address = address.substring(4) + address.substring(0, 2) + "00";

    let expanded = address.split("").map((c) => { return ibanLookup[c]; }).join("");

    // Javascript can handle integers safely up to 15 (decimal) digits
    while (expanded.length >= safeDigits){
        let block = expanded.substring(0, safeDigits);
        expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
    }

    let checksum = String(98 - (parseInt(expanded, 10) % 97));
    while (checksum.length < 2) { checksum = "0" + checksum; }

    return checksum;
};

export function getAddress(address: string): string {
    let result = null;

    if (typeof(address) !== "string") {
        logger.throwArgumentError("invalid address", "address", address);
    }

    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {

        // Missing the 0x prefix
        if (address.substring(0, 2) !== "0x") { address = "0x" + address; }

        result = getChecksumAddress(address);

        // Compatible Conflux Address
        // It is a checksummed address with a bad checksum
        // if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
        //     logger.throwArgumentError("bad address checksum", "address", address);
        // }
    } else if (isLikeBase32Address(address)) {
        result = getHex40AddressFromBase32(address)
    } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        // Maybe ICAP? (we only support direct mode)
        // It is an ICAP address with a bad checksum
        if (address.substring(2, 4) !== ibanChecksum(address)) {
            logger.throwArgumentError("bad icap checksum", "address", address);
        }

        result = _base36To16(address.substring(4));
        while (result.length < 40) { result = "0" + result; }
        result = getChecksumAddress("0x" + result);

    } else {
        logger.throwArgumentError("invalid address", "address", address);
    }

    return result;
}

export function isAddress(address: string): boolean {
    try {
        getAddress(address);
        return true;
    } catch (error) { }
    return false;
}

export function getIcapAddress(address: string): string {
    let base36 = _base16To36(getAddress(address).substring(2)).toUpperCase();
    while (base36.length < 30) { base36 = "0" + base36; }
    return "XE" + ibanChecksum("XE00" + base36) + base36;
}

// http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
export function getContractAddress(transaction: { from: string, nonce: BigNumberish }) {
    let from: string = null;
    try {
        from = getAddress(transaction.from);
    } catch (error) {
        logger.throwArgumentError("missing from address", "transaction", transaction);
    }

    const nonce = stripZeros(arrayify(BigNumber.from(transaction.nonce).toHexString()));

    return getAddress(hexDataSlice(keccak256(encode([ from, nonce ])), 12));
}

export function getCreate2Address(from: string, salt: BytesLike, initCodeHash: BytesLike): string {
    if (hexDataLength(salt) !== 32) {
        logger.throwArgumentError("salt must be 32 bytes", "salt", salt);
    }
    if (hexDataLength(initCodeHash) !== 32) {
        logger.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", initCodeHash);
    }
    return getAddress(hexDataSlice(keccak256(concat([ "0xff", getAddress(from), salt, initCodeHash ])), 12))
}
