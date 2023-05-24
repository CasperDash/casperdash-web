import { Buffer } from 'buffer/';
import {
  DeployUtil,
  Signer,
  RuntimeArgs,
  CLValueBuilder,
  CLAccountHash,
  CLKey,
  CLPublicKey,
} from 'casper-js-sdk';

import { Config } from '@/config';

export const NETWORK_NAME = Config.networkName;
export const PAYMENT_AMOUNT = 100000000000;
export const MOTE_RATE = 1000000000;
export const DEPLOY_TTL_MS = 1800000;

type BuildTransferDeployParams = {
  fromAccount: CLPublicKey;
  toAccount: CLPublicKey;
  amount: number;
  transferId: number;
  fee: number;
  network: string;
};

type BuildTransferTokenDeployParams = {
  fromAccount: CLPublicKey;
  toAccount: CLPublicKey;
  amount: number;
  fee: number;
  contractHash: string;
  network: string;
};

type BuildContractInstallDeployParams = {
  baseAccount: CLPublicKey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  network: string;
};

type SignDeployByCasperSignerParams = {
  deploy: DeployUtil.Deploy;
  mainAccountHex: string;
  setAccountHex: string;
};

/**
 * Get Transfer deploy
 * @param {CLPublicKey} fromAccount main account public key
 * @param {CLPublicKey} toAccount public key of target account
 * @param {Number} amount transfer amount
 * @param {Number} transferId transfer id. This parameter is optional
 * @param {Number} fee transfer fee
 * @param {String} network network name
 * @returns {Deploy} transfer deploy
 */
export const buildTransferDeploy = ({
  fromAccount,
  toAccount,
  amount,
  transferId,
  fee,
  network,
}: BuildTransferDeployParams) => {
  const deployParams = new DeployUtil.DeployParams(fromAccount, network);
  const transferParams = DeployUtil.ExecutableDeployItem.newTransfer(
    amount,
    toAccount,
    null,
    transferId
  );
  const payment = DeployUtil.standardPayment(fee * MOTE_RATE);
  const deploy = DeployUtil.makeDeploy(deployParams, transferParams, payment);
  return deploy;
};

/**
 * Build deploy for contract
 * @param {CLPublicKey} baseAccount main account public key
 * @param {Object} session hash contract content
 * @returns {Deploy} deploy of the contract
 */
export const buildContractInstallDeploy = ({
  baseAccount,
  session,
  network,
}: BuildContractInstallDeployParams) => {
  const deployParams = new DeployUtil.DeployParams(baseAccount, network);
  const payment = DeployUtil.standardPayment(PAYMENT_AMOUNT);
  return DeployUtil.makeDeploy(deployParams, session, payment);
};

/**
 * Sign a deploy by singer
 * @param {Deploy} deploy main account public key
 * @param {String} mainAccountHex hash contract content
 * @param {String} setAccountHex contract's arguments
 * @param {Object} ledgerOptions ledger's options
 * @returns {Deploy} Signed deploy
 */
export const signDeployByCasperSigner = async ({
  deploy,
  mainAccountHex,
  setAccountHex,
}: SignDeployByCasperSignerParams) => {
  const deployObj = DeployUtil.deployToJson(deploy);
  const signedDeploy = await Signer.sign(
    deployObj,
    mainAccountHex,
    setAccountHex
  );
  return signedDeploy;
};

/**
 * Get Recipient address
 * @param {CLPublicKey} recipient
 */
export const createRecipientAddress = (recipient: CLPublicKey) => {
  return new CLKey(new CLAccountHash(recipient.toAccountHash()));
};

/**
 * Get Transfer Token deploy
 * @param {CLPublicKey} fromAccount from account public key
 * @param {CLPublicKey} toAccount to account public key
 * @param {Number} amount transfer amount
 * @param {String} contractHash token contract hash
 * @returns {Deploy} transfer deploy
 */
export const buildTransferTokenDeploy = ({
  fromAccount,
  toAccount,
  amount,
  contractHash,
  fee,
  network = NETWORK_NAME,
}: BuildTransferTokenDeployParams) => {
  const contractHashAsByteArray = Uint8Array.from(
    Buffer.from(contractHash, 'hex')
  );
  const deployParams = new DeployUtil.DeployParams(
    fromAccount,
    network,
    1,
    DEPLOY_TTL_MS
  );
  const transferParams =
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      'transfer',
      RuntimeArgs.fromMap({
        amount: CLValueBuilder.u256(amount),
        recipient: createRecipientAddress(toAccount),
      })
    );
  const payment = DeployUtil.standardPayment(fee * MOTE_RATE);
  return DeployUtil.makeDeploy(deployParams, transferParams, payment);
};

/**
 * Request to connect with signer
 * @returns {string} error message
 */
export const connectCasperSigner = () => {
  try {
    Signer.sendConnectionRequest();
  } catch (error) {
    return (<Error>error).message;
  }
};
/**
 * Convert a contract hash to a byte array
 * @param contractHash - The contract hash of the contract you want to get the bytecode of.
 */
export const contractHashToByteArray = (contractHash: string) =>
  Uint8Array.from(Buffer.from(contractHash, 'hex'));
