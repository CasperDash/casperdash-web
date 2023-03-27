import { CLPublicKey, DeployUtil } from 'casper-js-sdk';

import { toMotes } from '../currency';
import { CasperConfigEnum } from '@/enums/casperConfig';

type BuildTransferDeployParams = {
  fromPublicKeyHex: string;
  toPublicKeyHex: string;
  amount: number;
  transferId: number;
  fee: number;
};

export const buildTransferDeploy = ({
  fromPublicKeyHex,
  toPublicKeyHex,
  amount,
  transferId,
  fee,
}: BuildTransferDeployParams) => {
  const fromPublicKey = CLPublicKey.fromHex(fromPublicKeyHex);
  const toPublicKey = CLPublicKey.fromHex(toPublicKeyHex);

  const deployParams = new DeployUtil.DeployParams(
    fromPublicKey,
    'casper-test'
  );
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
