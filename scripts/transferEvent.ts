import { ethers } from "hardhat";
import config from "../config";

async function main() {
  const BasicToken = await ethers.getContractFactory("BasicToken");
  const basicToken = BasicToken.attach(config.erc20Address);
  console.log(`${config.erc20Address}: Listening to Transfer event`);
  
  basicToken.on("Transfer", (from, to, value, event) => {
    console.log({
      from: from,
      to: to,
      value: value.toString(),
      data: event,
    });
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
