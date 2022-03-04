# Getting Started

Reference to:
https://ethereum.org/en/developers/docs/oracles/#:~:text=An%20oracle%20is%20a%20bridge,out%20to%20the%20real%20world.
https://codingwithmanny.medium.com/how-to-dockerize-your-hardhat-solidity-contract-on-localhost-a45424369896
https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e

## Design A Simple Oracle Contract

Please design a simple Oracle contract that tracks the current temperature, up to 2 decimal
places.
Requirements:

- Provide a setter for the temperature
- Provide a getter for the temperature
  Please take the following into consideration:
- How to ensure we are decentralized and without a single point of failure?
- How do we determine who can submit the temperature?
- How can we make sure no one is submitting wrong values?
- How do we detect outliers?
  For the language, you can use solidity, substrate or solana. If it is possible, please provide a
  full docker dev environment.
  To submit the exercise, you can upload to a public git repo or private git repo and add our
  devs to the project.

## Get started

#### Commands

```shell
docker-composer up # build and run
```

Deploy contract
```shell
docker exec -it hardhat-docker_hardhat_1 /bin/sh -c "cd /usr/src/app; yarn deploy:local"
```

Test contract
```shell
docker exec -it hardhat-docker_hardhat_1 /bin/sh -c "cd /usr/src/app; yarn test:local"
```

TODO: Run off-chain oracle nodes subscribed to event

TODO: Run script to request for current temperate up to 2 decimal

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
