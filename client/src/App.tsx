import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { erc20abi, erc20address } from "./config";

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
  31337: "Localhost 8545",
};

function App() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [networkId, setNetwork] = useState<number>(1);
  const [erc20, setErc20] = useState<ethers.Contract>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [targetAddresses, setTargetAddresses] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      const _provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      initContract(_provider);
      setProvider(_provider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Initialize contract by passing in provider or signer.
   * @param _providerOrSigner
   */
  const initContract = async (
    _providerOrSigner: ethers.providers.Provider | ethers.Signer | undefined
  ) => {
    const _erc20 = new ethers.Contract(
      erc20address,
      erc20abi,
      _providerOrSigner
    );
    setErc20(_erc20);
    getTokenSymbol(_erc20);
  };

  const getTokenSymbol = async (_erc20: ethers.Contract) => {
    const _tokenSymbol = await _erc20.symbol();
    setTokenSymbol(_tokenSymbol.toString());
  };

  const getTokenBalance = async (_address: string) => {
    if (erc20) {
      const _tokenBalance = await erc20.balanceOf(_address);
      const _formattedBalance = ethers.utils.formatUnits(_tokenBalance);
      setTokenBalance(_formattedBalance);
    }
  };

  const connectToMetaMask = async () => {
    if (provider) {
      await provider.send("eth_requestAccounts", []);
      await handleAccountChanged();
      await handleChainChanged();
    }
  };

  const handleAccountChanged = async () => {
    if (provider) {
      const _signer = provider.getSigner();
      const _address = await _signer.getAddress();
      const _balance = await _signer.getBalance();
      const _formattedBalance = ethers.utils.formatUnits(_balance);
      setSigner(_signer);
      setAddress(_address);
      setBalance(_formattedBalance);
      initContract(_signer);
      getTokenBalance(_address);
    }
  };

  const handleChainChanged = async () => {
    if (provider) {
      const _network = await provider.getNetwork();
      const _networkId = _network.chainId;
      setNetwork(_networkId);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async function () {
        window.location.reload();
      });
    }
  });

  useEffect(() => {
    if (provider) {
      provider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          window.location.reload();
        }
      });
    }
  });

  const tokenTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCompleted(false);

    // Simple validation
    if (!ethers.utils.isAddress(targetAddresses)) {
      setError("Invalid address.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter an valid amount.");
      return;
    }

    try {
      if (erc20 && signer && address) {
        setError("");

        const tx = await erc20
          .connect(signer)
          .transfer(targetAddresses, ethers.utils.parseUnits(amount));
        await tx.wait();

        getTokenBalance(address);
        setCompleted(true);
      }
    } catch (error) {
      console.error(error);
      setError(`Transaction failed: ${JSON.stringify(error)}`);
    }
  };

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
          {/* <p>
            <u>Balance: {balance} ETH</u>
          </p> */}
          <p>
            <u>
              Balance: {tokenBalance} {tokenSymbol}
            </u>
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
          onChange={(e) => setAmount(e.target.value)}
          required
        ></input>
        <small>Make sure you have enough token</small>
      </div>

      <p style={{ color: "red" }}>{error}</p>
      <p style={{ color: "green" }}>
        {completed ? "Transaction Completed" : null}
      </p>

      <div className="x-button-wrapper">
        <button type="submit">Transfer</button>
      </div>
    </form>
  );
}

export default App;
