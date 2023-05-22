import { BigNumberish } from '@ethersproject/bignumber';
import { Buffer } from 'buffer/';
import {
  CLPublicKey,
  DeployUtil,
  CLValueBuilder,
  RuntimeArgs,
  CLKey,
} from 'casper-js-sdk';

import {
  buildTransferTokenDeploy,
  contractHashToByteArray,
  createRecipientAddress,
  DEPLOY_TTL_MS,
  NETWORK_NAME,
} from './casperServices';
import { toBigNumMotes } from '../currency';
import { getSwapModuleBytes } from '@/services/friendlyMarket/moduleBytes';

export const FUNCTIONS = {
  // CSPR -> TOKENS
  SWAP_EXACT_CSPR_FOR_TOKENS: 'swap_exact_cspr_for_tokens',
  // TOKENS -> TOKENS
  SWAP_TOKENS_FOR_EXACT_TOKENS: 'swap_tokens_for_exact_tokens',
  // TOKENS -> CSPR
  SWAP_EXACT_TOKENS_FOR_CSPR: 'swap_exact_tokens_for_cspr',
  // TOKENS -> TOKENS (Routing)
  SWAP_EXACT_TOKENS_FOR_TOKENS: 'swap_exact_tokens_for_tokens',
};

type GetTransferDeployParams = {
  fromAddress: string;
  toAddress: string;
  amount: number;
  transferId: number;
  fee: number;
  network: string;
  contractInfo: {
    address: string;
    decimals: {
      hex: number;
    };
  };
};

type BuldExactSwapCSPRForTokensDeployParams = {
  fromPublicKey: string;
  toPublicKey: string;
  amountIn: number;
  amountOutMin: number;
  path: string[];
  deadline: number;
};

type BuildSwapTokensForExactTokensDeployParams = {
  fromPublicKey: string;
  toPublicKey: string;
  amountOut: number;
  amountInMax: number;
  path: string[];
  deadline: number;
};

type BuildSwapExactTokensForTokensDeployParams = {
  fromPublicKey: string;
  toPublicKey: string;
  amountIn: number;
  amountOutMin: number;
  path: string[];
  deadline: number;
};

type BuildSwapExactTokensForTokensDeploy = {
  fromPublicKey: string;
  toPublicKey: string;
  amountIn: number;
  amountOutMin: number;
  path: string[];
  deadline: number;
};

/**
 * It builds a transfer token deploy.
 * @param [transactionDetail] - {
 * @returns The transaction object.
 */
export const getTransferTokenDeploy = (
  transactionDetail: GetTransferDeployParams
) => {
  try {
    const { fromAddress, toAddress, amount, fee, network } = transactionDetail;
    const fromPbKey = CLPublicKey.fromHex(fromAddress);
    const toPbKey = CLPublicKey.fromHex(toAddress);
    return buildTransferTokenDeploy({
      fromAccount: fromPbKey,
      toAccount: toPbKey,
      amount: amount * 10 ** transactionDetail.contractInfo.decimals.hex,
      contractHash: transactionDetail.contractInfo.address,
      fee,
      network,
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get token transfer deploy.`);
  }
};

export const buildExactSwapCSPRForTokensDeploy = async (
  contractHash: string,
  transactionDetail: BuldExactSwapCSPRForTokensDeployParams
) => {
  console.log('contractHash: ', contractHash);
  const contractHashByteArray = contractHashToByteArray(contractHash);
  const fromPbKey = CLPublicKey.fromHex(transactionDetail.fromPublicKey);
  const toPbKey = CLPublicKey.fromHex(transactionDetail.toPublicKey);

  const mapping = {
    amount_in: CLValueBuilder.u256(transactionDetail.amountIn),
    amount_out_min: CLValueBuilder.u256(transactionDetail.amountOutMin),
    path: CLValueBuilder.list(
      transactionDetail.path.map((token) => CLValueBuilder.string(token))
    ),
    to: createRecipientAddress(toPbKey),
    deadline: CLValueBuilder.u64(transactionDetail.deadline),
    contract_hash_key: new CLKey(
      CLValueBuilder.byteArray(contractHashByteArray)
    ),
    // target_account: CLValueBuilder.byteArray(fromPbKey.toAccountHash()),
    deposit_entry_point_name: CLValueBuilder.string(
      FUNCTIONS.SWAP_EXACT_CSPR_FOR_TOKENS
    ),
    amount: CLValueBuilder.u512(transactionDetail.amountIn),
  };

  const runtimeArgs = RuntimeArgs.fromMap(mapping);

  return buildEntryPointModulBytesDeploy(
    fromPbKey,
    runtimeArgs,
    toBigNumMotes(10)
  );
};

export const buildSwapTokensForExactTokensDeploy = async (
  contractHash: string,
  transactionDetail: BuildSwapTokensForExactTokensDeployParams
) => {
  const fromPbKey = CLPublicKey.fromHex(transactionDetail.fromPublicKey);
  const toPbKey = CLPublicKey.fromHex(transactionDetail.toPublicKey);

  const mapping = {
    amount_out: CLValueBuilder.u256(transactionDetail.amountOut),
    amount_in_max: CLValueBuilder.u256(transactionDetail.amountInMax),
    path: CLValueBuilder.list(
      transactionDetail.path.map((token) => CLValueBuilder.string(token))
    ),
    to: createRecipientAddress(toPbKey),
    deadline: CLValueBuilder.u64(transactionDetail.deadline),
    // contract_hash_key: CLValueBuilder.key(CLValueBuilder.byteArray(contractHashByteArray)),
    // amount: CLValueBuilder.u256(0),
    // deposit_entry_point_name: CLValueBuilder.string(FUNCTIONS.SWAP_TOKENS_FOR_EXACT_TOKENS),
    // with_approve: CLValueBuilder.bool(true),
    // token0: CLValueBuilder.key(CLValueBuilder.byteArray(contractHashToByteArray(transactionDetail.path[0]))),
    // spender: CLValueBuilder.key(CLValueBuilder.byteArray(spenderHashByteArray)),
    // to: createRecipientAddress(toPbKey),
  };

  const runtimeArgs = RuntimeArgs.fromMap(mapping);

  return buildEntryPointDeploy(
    fromPbKey,
    contractHash,
    FUNCTIONS.SWAP_TOKENS_FOR_EXACT_TOKENS,
    runtimeArgs,
    toBigNumMotes(5)
  );
};

export const buildSwapExactTokensForTokensDeploy = async (
  contractHash: string,
  transactionDetail: BuildSwapExactTokensForTokensDeploy
) => {
  const contractHashByteArray = contractHashToByteArray(contractHash);
  const fromPbKey = CLPublicKey.fromHex(transactionDetail.fromPublicKey);
  const toPbKey = CLPublicKey.fromHex(transactionDetail.toPublicKey);

  const mapping = {
    amount_in: CLValueBuilder.u256(transactionDetail.amountIn),
    amount_out_min: CLValueBuilder.u256(transactionDetail.amountOutMin),
    path: CLValueBuilder.list(
      transactionDetail.path.map((token) => CLValueBuilder.string(token))
    ),
    to: createRecipientAddress(toPbKey),
    deadline: CLValueBuilder.u64(transactionDetail.deadline),
    contract_hash_key: CLValueBuilder.key(
      CLValueBuilder.byteArray(contractHashByteArray)
    ),
  };

  const runtimeArgs = RuntimeArgs.fromMap(mapping);

  return buildEntryPointDeploy(
    fromPbKey,
    contractHash,
    FUNCTIONS.SWAP_EXACT_TOKENS_FOR_TOKENS,
    runtimeArgs,
    toBigNumMotes(5)
  );
};

export const buildSwapExactTokensForCSPRDeploy = async (
  contractHash: string,
  transactionDetail: BuildSwapExactTokensForTokensDeployParams
) => {
  const fromPbKey = CLPublicKey.fromHex(transactionDetail.fromPublicKey);
  const toPbKey = CLPublicKey.fromHex(transactionDetail.toPublicKey);

  const mapping = {
    amount_in: CLValueBuilder.u256(transactionDetail.amountIn),
    amount_out_min: CLValueBuilder.u256(transactionDetail.amountOutMin),
    path: CLValueBuilder.list(
      transactionDetail.path.map((token) => CLValueBuilder.string(token))
    ),
    target_account: CLValueBuilder.byteArray(toPbKey.toAccountHash()),
    deadline: CLValueBuilder.u64(transactionDetail.deadline),
  };

  const runtimeArgs = RuntimeArgs.fromMap(mapping);

  return buildEntryPointDeploy(
    fromPbKey,
    contractHash,
    FUNCTIONS.SWAP_EXACT_TOKENS_FOR_CSPR,
    runtimeArgs,
    toBigNumMotes(15)
  );
};

/**
 * @param publicKey - The public key of the account that will be used to deploy the contract.
 * @param runtimeArgs - The arguments to pass to the contract.
 * @param paymentAmount - The amount of tokens to pay for the deploy.
 * @returns The deploy is being returned.
 */
export const buildEntryPointModulBytesDeploy = async (
  publicKey: CLPublicKey,
  runtimeArgs: RuntimeArgs,
  paymentAmount: BigNumberish
) => {
  const hex = await getSwapModuleBytes();

  return DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(publicKey, NETWORK_NAME, 1, DEPLOY_TTL_MS),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      Uint8Array.from(Buffer.from(hex, 'hex')),
      runtimeArgs
    ),

    DeployUtil.standardPayment(paymentAmount)
  );
};

/**
 * @param publicKey - The public key of the account that will be used to deploy the contract.
 * @param contractHash - The hash of the contract to be deployed.
 * @param entryPoint - The entry point.
 * @param runtimeArgs - The arguments to pass to the contract.
 * @param paymentAmount - The amount of tokens to pay for the deploy.
 * @returns The deploy is being returned.
 */
export const buildEntryPointDeploy = (
  publicKey: CLPublicKey,
  contractHash: string,
  entryPoint: string,
  runtimeArgs: RuntimeArgs,
  paymentAmount: BigNumberish
) => {
  const contractHashAsByteArray = Uint8Array.from(
    Buffer.from(contractHash, 'hex')
  );

  return DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(publicKey, NETWORK_NAME, 1, DEPLOY_TTL_MS),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      entryPoint,
      runtimeArgs
    ),
    DeployUtil.standardPayment(paymentAmount)
  );
};
