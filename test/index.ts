import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { BasicToken } from "../typechain-types";

describe("Deployment", function () {
  let contract: BasicToken;

  // eslint-disable-next-line no-unused-vars
  let contractOwner: SignerWithAddress;

  before(async () => {
    const [owner] = await ethers.getSigners();
    contractOwner = owner;
    const Contract = await ethers.getContractFactory("BasicToken");
    contract = await Contract.deploy("1000000000000000000000");
    await contract.deployed();
  });

  it("Should have initial supply of 1000000000000000000000", async () => {
    expect(
      (await contract.balanceOf(contractOwner.address)).toString()
    ).to.equal("1000000000000000000000");
  });

  it("Should have token name of Basic", async () => {
    expect(await contract.name()).to.equal("Basic");
  });

  it("Should have token symbol of B", async () => {
    expect(await contract.symbol()).to.equal("B");
  });
});

describe("Token Transfer", function () {
  let contract: BasicToken;

  // eslint-disable-next-line no-unused-vars
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async () => {
    const [owner, account1, account2] = await ethers.getSigners();
    user1 = account1;
    user2 = account2;
    const Contract = await ethers.getContractFactory("BasicToken");
    contract = await Contract.deploy("1000000000000000000000");
    await contract.deployed();

    contract.transfer(user1.address, 1000);
    contract.transfer(user2.address, 1000);
  });

  it("Assigns initial balance", async () => {
    expect(await contract.balanceOf(user1.address)).to.equal(1000);
    expect(await contract.balanceOf(user2.address)).to.equal(1000);
  });

  it("Transfer emits event", async () => {
    await expect(contract.connect(user1).transfer(user2.address, 7))
      .to.emit(contract, "Transfer")
      .withArgs(user1.address, user2.address, 7);
  });
});
