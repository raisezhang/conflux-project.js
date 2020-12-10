Ethereum Wallet
===============

This sub-module is part of the [conflux project](https://github.com/raisezhang/conflux-project.js).

It contains the class to manage a private key and signing for a standard
externally-owned account.

For more information, see the [documentation](https://docs.ethers.io/v5/api/signer/#Wallet).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/ethers),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Wallet,

    verifyMessage

} = require("@confluxproject/wallet");
```


License
-------

MIT License
