import { Buffer } from 'buffer/';
import {
  CLAccountHash,
  CLKey,
  CLPublicKey,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from 'casper-js-sdk';

import { toMotes } from '../currency';
import { CasperConfigEnum } from '@/enums/casperConfig';

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

  // Refactor this code. It's not good.
  const contractHashAsByteArray: Uint8Array = [
    ...Buffer.from(contractHash, 'hex'),
  ];

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
