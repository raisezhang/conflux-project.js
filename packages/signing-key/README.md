Signing Key
===========

This sub-module is part of the [conflux project](https://github.com/raisezhang/conflux-project.js).

It is responsible for secp256-k1 signing, verifying and recovery operations.

For more information, see the [documentation](https://docs.ethers.io/v5/api/utils/signing-key/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/ethers),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    SigningKey,

    computePublicKey,
    recoverPublicKey

} = require("@confluxproject/signing-key");
```

License
-------

MIT License
