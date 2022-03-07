/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface OracleInterface extends utils.Interface {
  contractName: "Oracle";
  functions: {
    "createRequest()": FunctionFragment;
    "currentId()": FunctionFragment;
    "minQuorum()": FunctionFragment;
    "requests(uint256)": FunctionFragment;
    "totalOracleCount()": FunctionFragment;
    "updateRequest(uint256,string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createRequest",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "currentId", values?: undefined): string;
  encodeFunctionData(functionFragment: "minQuorum", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "requests",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalOracleCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateRequest",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "createRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "currentId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "minQuorum", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "requests", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalOracleCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateRequest",
    data: BytesLike
  ): Result;

  events: {
    "NewRequest(uint256)": EventFragment;
    "UpdatedRequest(uint256,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewRequest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatedRequest"): EventFragment;
}

export type NewRequestEvent = TypedEvent<[BigNumber], { id: BigNumber }>;

export type NewRequestEventFilter = TypedEventFilter<NewRequestEvent>;

export type UpdatedRequestEvent = TypedEvent<
  [BigNumber, string],
  { id: BigNumber; temperature: string }
>;

export type UpdatedRequestEventFilter = TypedEventFilter<UpdatedRequestEvent>;

export interface Oracle extends BaseContract {
  contractName: "Oracle";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OracleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createRequest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    currentId(overrides?: CallOverrides): Promise<[BigNumber]>;

    minQuorum(overrides?: CallOverrides): Promise<[BigNumber]>;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { id: BigNumber; temperature: string }>;

    totalOracleCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    updateRequest(
      _id: BigNumberish,
      _valueRetrieved: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createRequest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  currentId(overrides?: CallOverrides): Promise<BigNumber>;

  minQuorum(overrides?: CallOverrides): Promise<BigNumber>;

  requests(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string] & { id: BigNumber; temperature: string }>;

  totalOracleCount(overrides?: CallOverrides): Promise<BigNumber>;

  updateRequest(
    _id: BigNumberish,
    _valueRetrieved: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createRequest(overrides?: CallOverrides): Promise<void>;

    currentId(overrides?: CallOverrides): Promise<BigNumber>;

    minQuorum(overrides?: CallOverrides): Promise<BigNumber>;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { id: BigNumber; temperature: string }>;

    totalOracleCount(overrides?: CallOverrides): Promise<BigNumber>;

    updateRequest(
      _id: BigNumberish,
      _valueRetrieved: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "NewRequest(uint256)"(id?: null): NewRequestEventFilter;
    NewRequest(id?: null): NewRequestEventFilter;

    "UpdatedRequest(uint256,string)"(
      id?: null,
      temperature?: null
    ): UpdatedRequestEventFilter;
    UpdatedRequest(id?: null, temperature?: null): UpdatedRequestEventFilter;
  };

  estimateGas: {
    createRequest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    currentId(overrides?: CallOverrides): Promise<BigNumber>;

    minQuorum(overrides?: CallOverrides): Promise<BigNumber>;

    requests(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    totalOracleCount(overrides?: CallOverrides): Promise<BigNumber>;

    updateRequest(
      _id: BigNumberish,
      _valueRetrieved: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createRequest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    currentId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minQuorum(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    requests(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalOracleCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateRequest(
      _id: BigNumberish,
      _valueRetrieved: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
