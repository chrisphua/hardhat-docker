/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Oracle, OracleInterface } from "../Oracle";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "NewRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "temperature",
        type: "string",
      },
    ],
    name: "UpdatedRequest",
    type: "event",
  },
  {
    inputs: [],
    name: "createRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minQuorum",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requests",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "temperature",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalOracleCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_valueRetrieved",
        type: "string",
      },
    ],
    name: "updateRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260006001556003600255600460035534801561001f57600080fd5b50610ba68061002f6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806381d12c581461006757806399cc7f6014610098578063b5a127e5146100b6578063c9579078146100d4578063cfb0ac99146100de578063e00dd161146100fa575b600080fd5b610081600480360381019061007c919061077c565b610118565b60405161008f9291906108dc565b60405180910390f35b6100a06101c4565b6040516100ad91906108c1565b60405180910390f35b6100be6101ca565b6040516100cb91906108c1565b60405180910390f35b6100dc6101d0565b005b6100f860048036038101906100f391906107a5565b6103db565b005b610102610656565b60405161010f91906108c1565b60405180910390f35b600060205280600052604060002060009150905080600001549080600101805461014190610a0f565b80601f016020809104026020016040519081016040528092919081815260200182805461016d90610a0f565b80156101ba5780601f1061018f576101008083540402835291602001916101ba565b820191906000526020600020905b81548152906001019060200180831161019d57829003601f168201915b5050505050905082565b60035481565b60025481565b60008060006001548152602001908152602001600020905060015481600001819055506040518060200160405280600081525081600101908051906020019061021a92919061065c565b5060018160030160007370997970c51812dc3a010c7d01b50e0d17dc79c873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506001816003016000733c44cdddb6a900fa2b585dd299e03d12fa4293bc73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060018160030160007390f79bf6eb2c4f870365e785982e1f101e93b90673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060018160030160007315d34aaf54267db7d7c367839aaf71a00a2c6a6573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507fe5e7dd91b3ed7fb84c335f117423d1b9bbbed2d76c57e81520dd681b9ede98856001546040516103b891906108c1565b60405180910390a1600160008154809291906103d390610a72565b919050555050565b6000806000848152602001908152602001600020905060018160030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414156106515760028160030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000805b806104f757600083600201600084815260200190815260200160002080546104ad90610a0f565b905014156104e457600190508383600201600084815260200190815260200160002090805190602001906104e292919061065c565b505b81806104ef90610a72565b925050610486565b6000808190505b60035481101561064c576000856002016000838152602001908152602001600020805461052a90610a0f565b80601f016020809104026020016040519081016040528092919081815260200182805461055690610a0f565b80156105a35780601f10610578576101008083540402835291602001916105a3565b820191906000526020600020905b81548152906001019060200180831161058657829003601f168201915b5050505050905060008790508080519060200120828051906020012014156106375783806105d090610a72565b945050600254841061063657878760010190805190602001906105f492919061065c565b507f9478514f64499fc60b1a2b8972e52aa1dc4a3b6ecc9096e0b3bcd80ee0d7a7da87600001548860010160405161062d92919061090c565b60405180910390a15b5b5050808061064490610a72565b9150506104fe565b505050505b505050565b60015481565b82805461066890610a0f565b90600052602060002090601f01602090048101928261068a57600085556106d1565b82601f106106a357805160ff19168380011785556106d1565b828001600101855582156106d1579182015b828111156106d05782518255916020019190600101906106b5565b5b5090506106de91906106e2565b5090565b5b808211156106fb5760008160009055506001016106e3565b5090565b600061071261070d84610961565b61093c565b90508281526020810184848401111561072a57600080fd5b6107358482856109cd565b509392505050565b600082601f83011261074e57600080fd5b813561075e8482602086016106ff565b91505092915050565b60008135905061077681610b59565b92915050565b60006020828403121561078e57600080fd5b600061079c84828501610767565b91505092915050565b600080604083850312156107b857600080fd5b60006107c685828601610767565b925050602083013567ffffffffffffffff8111156107e357600080fd5b6107ef8582860161073d565b9150509250929050565b6000610804826109a7565b61080e81856109b2565b935061081e8185602086016109dc565b61082781610b48565b840191505092915050565b6000815461083f81610a0f565b61084981866109b2565b945060018216600081146108645760018114610876576108a9565b60ff19831686526020860193506108a9565b61087f85610992565b60005b838110156108a157815481890152600182019150602081019050610882565b808801955050505b50505092915050565b6108bb816109c3565b82525050565b60006020820190506108d660008301846108b2565b92915050565b60006040820190506108f160008301856108b2565b818103602083015261090381846107f9565b90509392505050565b600060408201905061092160008301856108b2565b81810360208301526109338184610832565b90509392505050565b6000610946610957565b90506109528282610a41565b919050565b6000604051905090565b600067ffffffffffffffff82111561097c5761097b610b19565b5b61098582610b48565b9050602081019050919050565b60008190508160005260206000209050919050565b600081519050919050565b600082825260208201905092915050565b6000819050919050565b82818337600083830152505050565b60005b838110156109fa5780820151818401526020810190506109df565b83811115610a09576000848401525b50505050565b60006002820490506001821680610a2757607f821691505b60208210811415610a3b57610a3a610aea565b5b50919050565b610a4a82610b48565b810181811067ffffffffffffffff82111715610a6957610a68610b19565b5b80604052505050565b6000610a7d826109c3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610ab057610aaf610abb565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b610b62816109c3565b8114610b6d57600080fd5b5056fea2646970667358221220b4dff65273251ceb8b34700e8e36dedd50593edbe9dd92a8d0dd912202fbf71264736f6c63430008040033";

type OracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Oracle__factory extends ContractFactory {
  constructor(...args: OracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Oracle";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Oracle> {
    return super.deploy(overrides || {}) as Promise<Oracle>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Oracle {
    return super.attach(address) as Oracle;
  }
  connect(signer: Signer): Oracle__factory {
    return super.connect(signer) as Oracle__factory;
  }
  static readonly contractName: "Oracle";
  public readonly contractName: "Oracle";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OracleInterface {
    return new utils.Interface(_abi) as OracleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Oracle {
    return new Contract(address, _abi, signerOrProvider) as Oracle;
  }
}
