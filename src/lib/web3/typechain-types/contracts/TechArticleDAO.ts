/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface TechArticleDAOInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "BASE_REWARD"
      | "DEFAULT_ADMIN_ROLE"
      | "MIN_APPROVAL_RATE"
      | "MIN_VOTES_REQUIRED"
      | "REVIEWER_ROLE"
      | "VOTING_DURATION"
      | "addReviewer"
      | "articleCount"
      | "articles"
      | "getArticle"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "hasVoted"
      | "isReviewer"
      | "removeReviewer"
      | "renounceRole"
      | "reviewArticle"
      | "revokeRole"
      | "submitArticle"
      | "supportsInterface"
      | "yiDengToken"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ArticleStatusUpdated"
      | "ArticleSubmitted"
      | "ArticleVoted"
      | "RewardPaid"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "BASE_REWARD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_APPROVAL_RATE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_VOTES_REQUIRED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REVIEWER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "VOTING_DURATION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addReviewer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "articleCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "articles",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getArticle",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasVoted",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isReviewer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeReviewer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "reviewArticle",
    values: [BigNumberish, boolean, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "submitArticle",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "yiDengToken",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "BASE_REWARD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_APPROVAL_RATE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_VOTES_REQUIRED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REVIEWER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "VOTING_DURATION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addReviewer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "articleCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "articles", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getArticle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasVoted", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isReviewer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeReviewer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reviewArticle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitArticle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "yiDengToken",
    data: BytesLike
  ): Result;
}

export namespace ArticleStatusUpdatedEvent {
  export type InputTuple = [articleId: BigNumberish, status: BigNumberish];
  export type OutputTuple = [articleId: bigint, status: bigint];
  export interface OutputObject {
    articleId: bigint;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ArticleSubmittedEvent {
  export type InputTuple = [
    articleId: BigNumberish,
    author: AddressLike,
    title: string
  ];
  export type OutputTuple = [articleId: bigint, author: string, title: string];
  export interface OutputObject {
    articleId: bigint;
    author: string;
    title: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ArticleVotedEvent {
  export type InputTuple = [
    articleId: BigNumberish,
    reviewer: AddressLike,
    support: boolean
  ];
  export type OutputTuple = [
    articleId: bigint,
    reviewer: string,
    support: boolean
  ];
  export interface OutputObject {
    articleId: bigint;
    reviewer: string;
    support: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardPaidEvent {
  export type InputTuple = [
    articleId: BigNumberish,
    author: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [articleId: bigint, author: string, amount: bigint];
  export interface OutputObject {
    articleId: bigint;
    author: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface TechArticleDAO extends BaseContract {
  connect(runner?: ContractRunner | null): TechArticleDAO;
  waitForDeployment(): Promise<this>;

  interface: TechArticleDAOInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  BASE_REWARD: TypedContractMethod<[], [bigint], "view">;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  MIN_APPROVAL_RATE: TypedContractMethod<[], [bigint], "view">;

  MIN_VOTES_REQUIRED: TypedContractMethod<[], [bigint], "view">;

  REVIEWER_ROLE: TypedContractMethod<[], [string], "view">;

  VOTING_DURATION: TypedContractMethod<[], [bigint], "view">;

  addReviewer: TypedContractMethod<
    [account: AddressLike],
    [void],
    "nonpayable"
  >;

  articleCount: TypedContractMethod<[], [bigint], "view">;

  articles: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        id: bigint;
        author: string;
        title: string;
        contentHash: string;
        courseId: string;
        submissionTime: bigint;
        votesFor: bigint;
        votesAgainst: bigint;
        rewardAmount: bigint;
        status: bigint;
      }
    ],
    "view"
  >;

  getArticle: TypedContractMethod<
    [articleId: BigNumberish],
    [
      [
        string,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        author: string;
        title: string;
        contentHash: string;
        courseId: string;
        submissionTime: bigint;
        votesFor: bigint;
        votesAgainst: bigint;
        rewardAmount: bigint;
        status: bigint;
      }
    ],
    "view"
  >;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  hasVoted: TypedContractMethod<
    [articleId: BigNumberish, voter: AddressLike],
    [boolean],
    "view"
  >;

  isReviewer: TypedContractMethod<[account: AddressLike], [boolean], "view">;

  removeReviewer: TypedContractMethod<
    [account: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceRole: TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;

  reviewArticle: TypedContractMethod<
    [articleId: BigNumberish, support: boolean, qualityScore: BigNumberish],
    [void],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  submitArticle: TypedContractMethod<
    [title: string, contentHash: string, courseId: string],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  yiDengToken: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "BASE_REWARD"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "MIN_APPROVAL_RATE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MIN_VOTES_REQUIRED"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "REVIEWER_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "VOTING_DURATION"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "addReviewer"
  ): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "articleCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "articles"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        id: bigint;
        author: string;
        title: string;
        contentHash: string;
        courseId: string;
        submissionTime: bigint;
        votesFor: bigint;
        votesAgainst: bigint;
        rewardAmount: bigint;
        status: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getArticle"
  ): TypedContractMethod<
    [articleId: BigNumberish],
    [
      [
        string,
        string,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        author: string;
        title: string;
        contentHash: string;
        courseId: string;
        submissionTime: bigint;
        votesFor: bigint;
        votesAgainst: bigint;
        rewardAmount: bigint;
        status: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "hasVoted"
  ): TypedContractMethod<
    [articleId: BigNumberish, voter: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isReviewer"
  ): TypedContractMethod<[account: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "removeReviewer"
  ): TypedContractMethod<[account: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "reviewArticle"
  ): TypedContractMethod<
    [articleId: BigNumberish, support: boolean, qualityScore: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "submitArticle"
  ): TypedContractMethod<
    [title: string, contentHash: string, courseId: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "yiDengToken"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "ArticleStatusUpdated"
  ): TypedContractEvent<
    ArticleStatusUpdatedEvent.InputTuple,
    ArticleStatusUpdatedEvent.OutputTuple,
    ArticleStatusUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "ArticleSubmitted"
  ): TypedContractEvent<
    ArticleSubmittedEvent.InputTuple,
    ArticleSubmittedEvent.OutputTuple,
    ArticleSubmittedEvent.OutputObject
  >;
  getEvent(
    key: "ArticleVoted"
  ): TypedContractEvent<
    ArticleVotedEvent.InputTuple,
    ArticleVotedEvent.OutputTuple,
    ArticleVotedEvent.OutputObject
  >;
  getEvent(
    key: "RewardPaid"
  ): TypedContractEvent<
    RewardPaidEvent.InputTuple,
    RewardPaidEvent.OutputTuple,
    RewardPaidEvent.OutputObject
  >;
  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;

  filters: {
    "ArticleStatusUpdated(uint256,uint8)": TypedContractEvent<
      ArticleStatusUpdatedEvent.InputTuple,
      ArticleStatusUpdatedEvent.OutputTuple,
      ArticleStatusUpdatedEvent.OutputObject
    >;
    ArticleStatusUpdated: TypedContractEvent<
      ArticleStatusUpdatedEvent.InputTuple,
      ArticleStatusUpdatedEvent.OutputTuple,
      ArticleStatusUpdatedEvent.OutputObject
    >;

    "ArticleSubmitted(uint256,address,string)": TypedContractEvent<
      ArticleSubmittedEvent.InputTuple,
      ArticleSubmittedEvent.OutputTuple,
      ArticleSubmittedEvent.OutputObject
    >;
    ArticleSubmitted: TypedContractEvent<
      ArticleSubmittedEvent.InputTuple,
      ArticleSubmittedEvent.OutputTuple,
      ArticleSubmittedEvent.OutputObject
    >;

    "ArticleVoted(uint256,address,bool)": TypedContractEvent<
      ArticleVotedEvent.InputTuple,
      ArticleVotedEvent.OutputTuple,
      ArticleVotedEvent.OutputObject
    >;
    ArticleVoted: TypedContractEvent<
      ArticleVotedEvent.InputTuple,
      ArticleVotedEvent.OutputTuple,
      ArticleVotedEvent.OutputObject
    >;

    "RewardPaid(uint256,address,uint256)": TypedContractEvent<
      RewardPaidEvent.InputTuple,
      RewardPaidEvent.OutputTuple,
      RewardPaidEvent.OutputObject
    >;
    RewardPaid: TypedContractEvent<
      RewardPaidEvent.InputTuple,
      RewardPaidEvent.OutputTuple,
      RewardPaidEvent.OutputObject
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
  };
}
