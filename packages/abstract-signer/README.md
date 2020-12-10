Abstract Signer
===============

This sub-module is part of the [conflux project](https://github.com/raisezhang/conflux-project.js).

It is an abstraction of an Ethereum account, which may be backed by a [private key](https://www.npmjs.com/package/@confluxproject/wallet),
signing service (such as Geth or Parity with key managment enabled, or a
dedicated signing service such as Clef),
[hardware wallets](https://www.npmjs.com/package/@confluxproject/hardware-wallets), etc.

For more information, see the [documentation](https://docs.ethers.io/v5/api/signer/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/ethers),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Signer,
    VoidSigner,

    // Types
    ExternallyOwnedAccount

} = require("@confluxproject/abstract-signer");
```

License
-------

MIT License
