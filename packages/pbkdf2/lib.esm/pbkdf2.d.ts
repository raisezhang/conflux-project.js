import { BytesLike } from "@confluxproject/bytes";
export declare function pbkdf2(password: BytesLike, salt: BytesLike, iterations: number, keylen: number, hashAlgorithm: string): string;
