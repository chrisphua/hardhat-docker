import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Oracle } from "../typechain-types";

describe("Oracle", function () {
  const temperature = "29.90";
  const id = 0;
  const urlToQuery = "https://api.weather.com/";
  const attributeToFetch = "value";

  let contract: Oracle;
  // eslint-disable-next-line no-unused-vars
  let contractOwnerAddress: SignerWithAddress;
  let oracleAddress1: SignerWithAddress;
  let oracleAddress2: SignerWithAddress;
  let oracleAddress3: SignerWithAddress;

  before(async () => {
    const [owner, account1, account2, account3] = await ethers.getSigners();
    contractOwnerAddress = owner;
    oracleAddress1 = account1;
    oracleAddress2 = account2;
    oracleAddress3 = account3;

    const Contract = await ethers.getContractFactory("Oracle");
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Client sends a new API request", async () => {
    expect(await contract.currentId()).to.equal(id);
    await contract.createRequest(urlToQuery, attributeToFetch);
    expect(await contract.currentId()).to.equal(id + 1);
  });

  it("Oracle 1 updates API request", async () => {
    await contract.connect(oracleAddress1).updateRequest(id, temperature);
  });

  it("Client should fail to retrieve API response", async () => {
    const r = await contract.requests(id);
    expect(r.agreedValue).to.not.equal(temperature);
  });

  it("Oracle 2 updates API request", async () => {
    await contract.connect(oracleAddress2).updateRequest(id, temperature);
  });

  it("Client should fail to retrieve API response", async () => {
    const r = await contract.requests(id);
    expect(r.agreedValue).to.not.equal(temperature);
  });

  it("Oracle 3 updates API request", async () => {
    await contract.connect(oracleAddress3).updateRequest(id, temperature);
  });

  it("Client should retrieve API response", async () => {
    const r = await contract.requests(id);
    expect(r.agreedValue).to.equal(temperature);
  });
});
