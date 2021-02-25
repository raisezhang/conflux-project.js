"use strict";

import fs from "fs";

import { colorify } from "../log";
import { resolve } from "../path";

const sourceEthers = fs.readFileSync(resolve("packages/conflux/src.ts/ethers.ts")).toString();
const targets = sourceEthers.match(/export\s*{\s*((.|\s)*)}/)[1].trim();

////////////////////
// Begin template
////////////////////

const output = `"use strict";

// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

import * as ethers from "./conflux";

try {
    const anyGlobal = (window as any);

    if (anyGlobal._ethers == null) {
        anyGlobal._ethers = ethers;
    }
} catch (error) { }

export { ethers };

export {
    ${ targets }
} from "./conflux";
`;

////////////////////
// End template
////////////////////

console.log(colorify.bold(`Flattening exports...`))

fs.writeFileSync(resolve("packages/conflux/src.ts/index.ts"), output);
