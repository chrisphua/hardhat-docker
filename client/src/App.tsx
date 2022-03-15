import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

declare var window: any;

interface networkChainId {
  [networkId: number]: string;
}

const networkChainIds: networkChainId = {
  1: "Ethereum Mainnet",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
};

function App() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [networkId, setNetwork] = useState<number>(1);

  const [targetAddresses, setTargetAddresses] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      const _provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      setProvider(_provider);
    }
  }, []);

  const connectToMetaMask = async () => {
    if (provider) {
      await provider.send("eth_requestAccounts", []);
      await handleAccountChanged();
      await handleChainChanged();
    }
  };

  const handleAccountChanged = async () => {
    if (provider) {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await signer.getBalance();
      const formattedBalance = ethers.utils.formatUnits(balance)
      setAddress(address);
      setBalance(formattedBalance);
    }
  };

  const handleChainChanged = async () => {
    if (provider) {
      const network = await provider.getNetwork();
      const _networkId = network.chainId;
      setNetwork(_networkId);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async function () {
        handleAccountChanged();
      });

      return window.ethereum.removeListener(
        "accountsChanged",
        async function () {
          handleAccountChanged();
        }
      );
    }
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", async function () {
        handleChainChanged();
      });

      return window.ethereum.removeListener("chainChanged", async function () {
        handleChainChanged();
      });
    }
  });

  const tokenTransfer = () => {};

  return (
    <form className="form" onSubmit={tokenTransfer}>
      {networkId && address && balance ? (
        <>
          <p>
            <u>Connected network: {networkChainIds[networkId]}</u>
          </p>
          <p>
            <u>Connected address: {address}</u>
          </p>
          <p>
            <u>Balance: {balance} ETH</u>
          </p>
        </>
      ) : (
        <button type="button" onClick={connectToMetaMask}>
          Connect To MetaMask
        </button>
      )}
      <h1>Transfer</h1>
      <p>Transfer your Token here:</p>
      <div className="x-input-field">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={targetAddresses}
          onChange={(e) => setTargetAddresses(e.target.value)}
          required
        ></input>
      </div>
      <div className="x-input-field">
        <label htmlFor="token">Token Amount</label>
        <input
          id="token"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        ></input>
        <small>Make sure you have enough token</small>
      </div>

      <div className="x-button-wrapper">
        <button type="submit">Transfer</button>
      </div>
    </form>
  );
}

export default App;
