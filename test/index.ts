import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Oracle } from "../typechain-types";

describe("Oracle", function () {
  const correctTemperature = "30.00";

  const oracle1Temperature = "30.00";
  const oracle2Temperature = "30.00";
  const oracle3Temperature = "31.00"; // Outlier
  const oracle4Temperature = "30.00";
  const id = 0;

  let contract: Oracle;
  // eslint-disable-next-line no-unused-vars
  let contractOwnerAddress: SignerWithAddress;
  let oracleAddress1: SignerWithAddress;
  let oracleAddress2: SignerWithAddress;
  let oracleAddress3: SignerWithAddress;
  let oracleAddress4: SignerWithAddress;

  before(async () => {
    const [owner, account1, account2, account3, account4] = await ethers.getSigners();
    contractOwnerAddress = owner;
    oracleAddress1 = account1;
    oracleAddress2 = account2;
    oracleAddress3 = account3;
    oracleAddress4 = account4;

    const Contract = await ethers.getContractFactory("Oracle");
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Client sends a new API request", async () => {
    expect(await contract.currentId()).to.equal(id);
    await contract.createRequest();
    expect(await contract.currentId()).to.equal(id + 1);
  });

  it("Oracle 1 updates API request", async () => {
    await contract.connect(oracleAddress1).updateRequest(id, oracle1Temperature);
  });

  it("Client should fail to retrieve API response", async () => {
    const r = await contract.requests(id);
    expect(r.temperature).to.not.equal(correctTemperature);
  });

  it("Oracle 2 updates API request", async () => {
    await contract.connect(oracleAddress2).updateRequest(id, oracle2Temperature);
  });

  it("Client should fail to retrieve API response", async () => {
    const r = await contract.requests(id);
    expect(r.temperature).to.not.equal(correctTemperature);
  });

  it("Oracle 3 updates API request", async () => {
    await contract.connect(oracleAddress3).updateRequest(id, oracle3Temperature);
  });

  it("Client should fail to retrieve API response", async () => {
    const r = await contract.requests(id);
    expect(r.temperature).to.not.equal(correctTemperature);
  });

  it("Oracle 4 updates API request", async () => {
    await contract.connect(oracleAddress4).updateRequest(id, oracle4Temperature);
  });

  it("Client should retrieve API response", async () => {
    const r = await contract.requests(id);
    expect(r.temperature).to.equal(correctTemperature);
  });
});
