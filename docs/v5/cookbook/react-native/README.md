-----

Documentation: [html](https://docs.ethers.io/)

-----

React Native (and ilk)
======================

Installing
----------

```
/home/ricmoo/my-react-project> npm install @confluxproject/shims --save
```

```
// Pull in the shims (BEFORE importing ethers)
import "@confluxproject/shims"

// Import the ethers library
import { ethers } from "ethers";
```

Security
--------

```
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@confluxproject/shims"

// Import the ethers library
import { ethers } from "ethers";
```

