// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import config from "../config";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // eslint-disable-next-line no-unused-vars
  const signerAddresses = await ethers.getSigners();

  // We get the contract to deploy
  const BasicToken = await ethers.getContractFactory("BasicToken");
  const basicToken = BasicToken.attach(config.erc20Address);

  for (let i = 0; i < signerAddresses.length; i++) {
    basicToken.transfer(signerAddresses[i].address, "1000000000000000000");
    console.log("BasicToken transferred 1000000000000000000 to:", signerAddresses[i].address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
