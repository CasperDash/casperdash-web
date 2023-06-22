import { BigNumber } from '@ethersproject/bignumber';
import { Buffer } from 'buffer/';
import {
  CLAccountHash,
  CLKey,
  CLPublicKey,
  CLValue,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from 'casper-js-sdk';

import { toMotes } from '../currency';
import { getStakeAuctionHash } from '../stack';
import { CasperConfigEnum } from '@/enums/casperConfig';

export enum EntryPointsEnum {
  STAKE_DELEGATE = 'delegate',
  STAKE_UNDELEGATE = 'undelegate',
}

type BuildTransferDeployParams = {
  fromPublicKeyHex: string;
  toPublicKeyHex: string;
  amount: number;
  transferId: number;
  fee: number;
  network: string;
};

type BuildTransferTokenDeployParams = {
  fromPublicKeyHex: string;
  toPublicKeyHex: string;
  amount: number;
  fee: number;
  contractHash: string;
  network: string;
};

type BuildStakeDelegateDeployParams = {
  fromAddress: string;
  validator: string;
  fee: number;
  amount: number;
  network: string;
};

type BuildStakeDeployParams = {
  baseAccount: CLPublicKey;
  entryPoint: string;
  args: Record<string, CLValue>;
  paymentAmount: BigNumber | number;
  network: string;
};

export const buildTransferDeploy = ({
  fromPublicKeyHex,
  toPublicKeyHex,
  amount,
  transferId,
  fee,
  network,
}: BuildTransferDeployParams): DeployUtil.Deploy => {
  const fromPublicKey = CLPublicKey.fromHex(fromPublicKeyHex);
  const toPublicKey = CLPublicKey.fromHex(toPublicKeyHex);

  const deployParams = new DeployUtil.DeployParams(fromPublicKey, network);
  const transferParams = DeployUtil.ExecutableDeployItem.newTransfer(
    toMotes(amount),
    toPublicKey,
    null,
    transferId
  );
  const payment = DeployUtil.standardPayment(fee * CasperConfigEnum.MOTE_RATE);
  const deploy = DeployUtil.makeDeploy(deployParams, transferParams, payment);
  return deploy;
};

/**
 * Get Recipient address
 * @param {CLPublicKey} recipient
 */
export const createRecipientAddress = (recipient: CLPublicKey) => {
  return new CLKey(new CLAccountHash(recipient.toAccountHash()));
};

export const buildTransferTokenDeploy = ({
  fromPublicKeyHex,
  toPublicKeyHex,
  amount,
  contractHash,
  fee,
  network,
}: BuildTransferTokenDeployParams) => {
  const fromPublicKey = CLPublicKey.fromHex(fromPublicKeyHex);
  const toPublicKey = CLPublicKey.fromHex(toPublicKeyHex);

  const contractHashAsByteArray = Uint8Array.from(
    Buffer.from(contractHash, 'hex')
  );
  const deployParams = new DeployUtil.DeployParams(
    fromPublicKey,
    network,
    1,
    CasperConfigEnum.DEPLOY_TTL_MS
  );
  const transferParams =
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      'transfer',
      RuntimeArgs.fromMap({
        amount: CLValueBuilder.u256(amount),
        recipient: createRecipientAddress(toPublicKey),
      })
    );
  const payment = DeployUtil.standardPayment(fee * CasperConfigEnum.MOTE_RATE);
  return DeployUtil.makeDeploy(deployParams, transferParams, payment);
};

export const buildStakeDelegateDeploy = ({
  fromAddress,
  validator,
  fee,
  amount,
  network,
}: BuildStakeDelegateDeployParams) => {
  const fromAccPk = CLPublicKey.fromHex(fromAddress);
  const validatorPk = CLPublicKey.fromHex(validator);

  const args = {
    delegator: fromAccPk,
    validator: validatorPk,
    amount: CLValueBuilder.u512(toMotes(amount)),
  };

  return buildStakeDeploy({
    baseAccount: fromAccPk,
    entryPoint: EntryPointsEnum.STAKE_DELEGATE,
    args,
    paymentAmount: toMotes(fee),
    network,
  });
};

export const buildStakeUndelegateDeploy = ({
  fromAddress,
  validator,
  fee,
  amount,
  network,
}: BuildStakeDelegateDeployParams) => {
  const fromAccPk = CLPublicKey.fromHex(fromAddress);
  const validatorPk = CLPublicKey.fromHex(validator);

  const args = {
    delegator: fromAccPk,
    validator: validatorPk,
    amount: CLValueBuilder.u512(toMotes(amount)),
  };

  return buildStakeDeploy({
    baseAccount: fromAccPk,
    entryPoint: EntryPointsEnum.STAKE_UNDELEGATE,
    args,
    paymentAmount: toMotes(fee),
    network,
  });
};

const buildStakeDeploy = ({
  baseAccount,
  entryPoint,
  args,
  paymentAmount,
  network,
}: BuildStakeDeployParams) => {
  const deployParams = new DeployUtil.DeployParams(baseAccount, network);
  const runTimeArgs = RuntimeArgs.fromMap(args);
  const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
    getStakeAuctionHash().auction,
    entryPoint,
    runTimeArgs
  );
  const payment = DeployUtil.standardPayment(paymentAmount);

  return DeployUtil.makeDeploy(deployParams, session, payment);
};
