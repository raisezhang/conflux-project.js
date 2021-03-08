import { BytesLike } from "@confluxproject/bytes";
import { BigNumberish } from "@confluxproject/bignumber";
export declare function isLikeHex40Address(address: string): boolean;
export declare function isLikeBase32Address(address: string): boolean;
export declare function getBase32AddressFromHex40(address: string, chainId: number | undefined): string;
export declare function getHex40AddressFromBase32(address: string): string;
export declare function getAddress(address: string): string;
export declare function isAddress(address: string): boolean;
export declare function getIcapAddress(address: string): string;
export declare function getContractAddress(transaction: {
    from: string;
    nonce: BigNumberish;
}): string;
export declare function getCreate2Address(from: string, salt: BytesLike, initCodeHash: BytesLike): string;
