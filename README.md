Test consinting on a contract that withdraws funds from another contract. The second contract uses a low level call to send the funds, and is erroring.

```
witwithdrawFromTarget throws Error: {"revert":"reverted"}
```

It worked in a Ethereum testnet.

We could use transfer() instead of a low level call, but then we are limited to
2300 gas, so we cannot add some logic inside receive() as we will run out of gas

## Steps to reproduce

-   Remove the _.example_ from the _.env.example_ file.
-   Add seeds of an account with balance in the test network.
-   Run:

```shell
yarn hardhat test
```
