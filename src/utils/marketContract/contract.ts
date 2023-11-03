import { BigNumber } from '@ethersproject/bignumber';
import { hexToBytes } from '@noble/hashes/utils';
import {
  RuntimeArgs,
  CLValueBuilder,
  CLByteArray,
  CLU512,
  CLU256,
  CLAccountHash,
  DeployUtil,
  CLPublicKey,
} from 'casper-js-sdk';

import ListItemCep78NumberWasm from './wasm/list-item-cep78-number.wasm';
import ListItemWasm from './wasm/list-item.wasm';
import BuyItemWasm from './wasm/market-buy-item.wasm';
import { Contract } from '../contract';
import { DeployActionsEnum } from '@/enums/deployActions';
import { MarketTokenTypesEnum } from '@/enums/marketTokeTypes';

const MAPPED_WASM_FILES = {
  [MarketTokenTypesEnum.CEP78Number]: ListItemCep78NumberWasm,
  [MarketTokenTypesEnum.CEP47Number]: ListItemWasm,
};

class ContractUtils {
  public static contractToCLByteArray(hash: string) {
    return CLValueBuilder.byteArray(this.contractToByteArray(hash));
  }

  public static contractToByteArray(hash: string) {
    const hashOnly = hash.replace('hash-', '').replace('contract-', '');
    return hexToBytes(hashOnly);
  }
}

export interface DeployArgs {
  paymentAmount: number;
  fromPublicKeyHex: string;
}

/**
 * Type of order
 */
export enum MarketOrderType {
  FixedAmount = 0,
}

export class ContractInfo {
  constructor(
    public contractPackageHash: string,
    public contractHash: string
  ) {}

  public toByteArray(): Uint8Array {
    return ContractUtils.contractToByteArray(this.contractHash);
  }
}

/**
 * Presents for an order item
 */
export class MarketOrder {
  public mode!: MarketOrderType;
  public token!: CLByteArray;
  public token_id!: CLU256;
  public amount!: CLU512;
  /**
   * The account-hash of seller
   */
  public seller!: CLAccountHash;
  /**
   * The account-hash of buyer
   */
  public buyer!: CLAccountHash;
}

/**
 * List of supported events to track
 */
export enum MarketEvents {
  ListItem = 'market_list_item',
  CancelItem = 'market_cancel_item',
  BuyItem = 'market_buy_item',
}

export interface ParserArgs {
  contractPackageHash: string;
  eventNames: MarketEvents[];
}

export class MarketOrderEventData {
  public id!: number;
}

export class MarketListItem extends MarketOrderEventData {}

export class MarketCancelItem extends MarketOrderEventData {}

export class MarketBuyItem extends MarketOrderEventData {
  public buyer!: CLAccountHash;
}

export interface MarketInstallArgs extends DeployArgs {
  wasm: Uint8Array;
  id: string;
  name: string;
  admins: CLAccountHash[];
}

interface MarketDeployWithTokenArgs extends DeployArgs {
  token: string;
  tokenId: string;
}

export interface MarketListItemArgs extends MarketDeployWithTokenArgs {
  amount: number | BigNumber;
  tokenType?: MarketTokenTypesEnum;
}

export type MarketCancelItemArgs = MarketDeployWithTokenArgs;

export interface BuyItemArgs extends MarketDeployWithTokenArgs {
  amount: number;
}

export interface MarketSetFeeArgs extends DeployArgs {
  fee: number;
}

export interface MarketRegisterTokenArgs extends DeployArgs {
  token: ContractInfo;
  type: MarketTokenTypesEnum;
}

export type MarketGetBalanceArgs = DeployArgs;

export class MarketContract extends Contract {
  constructor(
    public contractHash: string,
    public contractPackageHash: string,
    public config: {
      chainName: string;
    }
  ) {
    super(contractHash, contractPackageHash);
  }

  public registerToken(args: MarketRegisterTokenArgs): DeployUtil.Deploy {
    const runtimeArgs = RuntimeArgs.fromMap({
      token: CLValueBuilder.byteArray(args.token.toByteArray()),
      type: CLValueBuilder.u32(args.type),
    });

    return this.callEntrypoint(
      'register_token',
      runtimeArgs,
      CLPublicKey.fromHex(args.fromPublicKeyHex),
      this.config.chainName,
      String(args.paymentAmount),
      []
    );
  }

  public async listItem(args: MarketListItemArgs) {
    const { tokenType } = args;
    if (!tokenType) {
      throw new Error('Token type is required');
    }

    if (!MAPPED_WASM_FILES[tokenType as keyof typeof MAPPED_WASM_FILES]) {
      throw new Error('Token type is not supported');
    }
    let wasm;
    let runtimeArgs;

    switch (tokenType) {
      case MarketTokenTypesEnum.CEP78Number:
        wasm = MAPPED_WASM_FILES[MarketTokenTypesEnum.CEP78Number];
        runtimeArgs = RuntimeArgs.fromMap({
          nft_contract_hash: CLValueBuilder.key(
            CLValueBuilder.byteArray(
              ContractUtils.contractToByteArray(args.token)
            )
          ),
          market_contract_hash: CLValueBuilder.key(
            CLValueBuilder.byteArray(
              ContractUtils.contractToByteArray(this.contractHash)
            )
          ),
          token_id: CLValueBuilder.string(args.tokenId),
          amount: CLValueBuilder.u512(args.amount),
        });

        break;
      case MarketTokenTypesEnum.CEP47Number:
        wasm = MAPPED_WASM_FILES[MarketTokenTypesEnum.CEP47Number];
        runtimeArgs = RuntimeArgs.fromMap({
          nft_contract_hash: CLValueBuilder.key(
            CLValueBuilder.byteArray(
              ContractUtils.contractToByteArray(args.token)
            )
          ),
          market_contract_hash: CLValueBuilder.key(
            CLValueBuilder.byteArray(
              ContractUtils.contractToByteArray(this.contractHash)
            )
          ),
          spender: CLValueBuilder.key(
            CLValueBuilder.byteArray(
              ContractUtils.contractToByteArray(this.contractPackageHash)
            )
          ),
          token_id: CLValueBuilder.string(args.tokenId),
          amount: CLValueBuilder.u512(args.amount),
        });

        break;
      default:
        throw new Error('Token type is not supported');
    }

    return this.callSessionWasm(
      wasm,
      runtimeArgs,
      String(args.paymentAmount),
      CLPublicKey.fromHex(args.fromPublicKeyHex),
      this.config.chainName,
      []
    );
  }

  public async cancelItem(args: MarketCancelItemArgs) {
    const runtimeArgs = RuntimeArgs.fromMap({
      token: ContractUtils.contractToCLByteArray(args.token),
      token_id: CLValueBuilder.string(args.tokenId),
    });

    return this.callEntrypoint(
      'cancel_item',
      runtimeArgs,
      CLPublicKey.fromHex(args.fromPublicKeyHex),
      this.config.chainName,
      String(args.paymentAmount),
      []
    );
  }

  public async buyItem(args: BuyItemArgs) {
    const runtimeArgs = RuntimeArgs.fromMap({
      market: ContractUtils.contractToCLByteArray(this.contractHash!),
      token: ContractUtils.contractToCLByteArray(args.token),
      token_id: CLValueBuilder.string(args.tokenId),
      amount: CLValueBuilder.u512(args.amount),
    });

    return this.callSessionWasm(
      BuyItemWasm,
      runtimeArgs,
      String(args.paymentAmount),
      CLPublicKey.fromHex(args.fromPublicKeyHex),
      this.config.chainName,
      []
    );
  }
}

export const getFeeByAction = (
  action: DeployActionsEnum,
  tokenType?: MarketTokenTypesEnum
) => {
  switch (action) {
    case DeployActionsEnum.BUY_ITEM:
      return tokenType === MarketTokenTypesEnum.CEP47Number ? 27 : 40;
    default:
      return 15;
  }
};
