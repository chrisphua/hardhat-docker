# Getting Started

Reference to:

- https://ethereum.org/en/developers/docs/oracles/#:~:text=An%20oracle%20is%20a%20bridge,out%20to%20the%20real%20world
- https://codingwithmanny.medium.com/how-to-dockerize-your-hardhat-solidity-contract-on-localhost-a45424369896
- https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e

## Design A Simple Oracle Contract

Please design a simple Oracle contract that tracks the current temperature, up to 2 decimal
places.

Requirements:

- Provide a setter for the temperature
- Provide a getter for the temperature

Please take the following into consideration:

- How to ensure we are decentralized and without a single point of failure?
Answer: More off-chain oracles ensure decentralized and without a single point of failure.
- How do we determine who can submit the temperature?
Answer: Only participanting off-chain oracles can submit the temperature.
- How can we make sure no one is submitting wrong values?
Answer: To check the newly submitted temperature against an array of submitted temperatures in a specific request.
- How do we detect outliers?
Answer: There are few methods to detech outliers. One of the methods is to compute standard deviation (off-chain oracles should have accessed to other off-chain oracles data points) and finding out the outliers at off-chain oracles before submitting to the oracle smart contract. (https://towardsdatascience.com/5-ways-to-detect-outliers-that-every-data-scientist-should-know-python-code-70a54335a623). This will greatly reduce the transaction cost and avoid submitting wrong values.
  
For the language, you can use solidity, substrate or solana. If it is possible, please provide a full docker dev environment.

To submit the exercise, you can upload to a public git repo or private git repo and add our devs to the project.

## Get started

#### Requirements

- Docker: version 20.10.12, build e91ed57
- Docker Compose: version v2.2.3
- Npm: 6.14.16
- Node: v14.19.0

#### Commands

```shell
$ npm install
$ docker compose up
```