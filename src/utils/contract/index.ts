import { Buffer } from 'buffer/';
import { CLPublicKey, DeployUtil, Keys, RuntimeArgs } from 'casper-js-sdk';

export const DEFAULT_DEPLOY_TTL = 1800000;

/**
 * Convert a contract hash hexadecimal string to a byte array
 * @param contractHash Hexadecimal string of a contract hash, without the "hash-" prefix
 * @returns `Uint8Array` representation of the contract hash
 */
export const contractHashToByteArray = (contractHash: string) =>
  Uint8Array.from(Buffer.from(contractHash, 'hex'));

/** Smart contract object for interacting with contracts on the Casper Network */
export class Contract {
  public contractHash?: string;
  public contractPackageHash?: string;

  constructor(contractHash?: string, contractPackageHash?: string) {
    if (contractHash) {
      this.setContractHash(contractHash, contractPackageHash);
    }
  }

  /**
   * Attaches an on-chain smart contract to this `Contract` object using its hexadecimal string typed hash. The contract hash must include the prefix "hash-"
   * @param contractHash The hexadecimal smart contract hash, with the prefix "hash-"
   * @param contractPackageHash The hexadecimal smart contract package hash, with the prefix "hash-". This parameter is optional, and only used when there is event processing present.
   */
  public setContractHash(
    contractHash: string,
    contractPackageHash?: string
  ): void {
    if (
      !contractHash.startsWith('hash-') ||
      (contractPackageHash && !contractPackageHash.startsWith('hash-'))
    ) {
      throw new Error(
        'Please provide contract hash in a format that contains hash- prefix.'
      );
    }

    this.contractHash = contractHash;
    this.contractPackageHash = contractPackageHash;
  }

  /**
   * Install a smart contract on a Casper Network
   * @param wasm `Uint8Array` representation of a WebAssembly compiled smart contract
   * @param args The runtime arguments for the installment deploy
   * @param paymentAmount The gas payment in motes, where 1 mote = 10^-9 CSPR. Use a stringified base-10 integer
   * @param sender `CLPublicKey` of the sender of the installment deploy
   * @param chainName The name of the network the installment deploy will be sent to. You can get the network name of a node by calling the REST endpoint `:8888/status`
   * @param signingKeys An array of keypairs used to sign the deploy. If you are signing with one key, use an array with only the one keypair. If instead you are utilizing multi-sig functionality, provide multiple keypair objects in the array.
   * @returns The installment deploy, to be sent to a node.
   * @remarks In the future, this method will be an alias to a different method: `callModuleBytesEntrypoint`
   */
  public callSessionWasm(
    wasm: Uint8Array,
    args: RuntimeArgs,
    paymentAmount: string,
    sender: CLPublicKey,
    chainName: string,
    signingKeys: Keys.AsymmetricKey[] = []
  ): DeployUtil.Deploy {
    const deploy = DeployUtil.makeDeploy(
      new DeployUtil.DeployParams(sender, chainName),
      DeployUtil.ExecutableDeployItem.newModuleBytes(wasm, args),
      DeployUtil.standardPayment(paymentAmount)
    );

    if (!signingKeys || signingKeys.length === 0) {
      return deploy;
    }

    const signedDeploy = deploy.sign(signingKeys);

    return signedDeploy;
  }

  private checkSetup(): boolean {
    if (this.contractHash) return true;
    throw Error('You need to setContract before running this method.');
  }

  /**
   * Call an entrypoint of a smart contract.
   * @param entryPoint The name of an entrypoint of a smart contract that you wish to call
   * @param args The runtime arguments for the deploy
   * @param sender `CLPublicKey` of the sender of the deploy
   * @param chainName The name of the network the installment deploy will be sent to. You can get the network name of a node by calling the REST endpoint `:8888/status`
   * @param paymentAmount The gas payment in motes, where 1 mote = 10^-9 CSPR. Use a stringified base-10 integer
   * @param signingKeys An array of keypairs used to sign the deploy. If you are signing with one key, use an array with only the one keypair. If instead you are utilizing multi-sig functionality, provide multiple keypair objects in the array.
   * @param ttl The time that the deploy has to live. If the deploy awaits execution longer than this interval, in seconds, then the deploy will fail. This parameter will default to the [DEFAULT_DEPLOY_TTL](../constants.ts#L1) if not specified.
   * @returns A Deploy object that can be sent to a node to call an entrypoint
   */
  public callEntrypoint(
    entryPoint: string,
    args: RuntimeArgs,
    sender: CLPublicKey,
    chainName: string,
    paymentAmount: string,
    signingKeys: Keys.AsymmetricKey[] = [],
    ttl: number = DEFAULT_DEPLOY_TTL
  ): DeployUtil.Deploy {
    this.checkSetup();

    const contractHashAsByteArray = contractHashToByteArray(
      this.contractHash!.slice(5)
    );

    const deploy = DeployUtil.makeDeploy(
      new DeployUtil.DeployParams(sender, chainName, 1, ttl),
      DeployUtil.ExecutableDeployItem.newStoredContractByHash(
        contractHashAsByteArray,
        entryPoint,
        args
      ),
      DeployUtil.standardPayment(paymentAmount)
    );

    if (!signingKeys || signingKeys.length === 0) {
      return deploy;
    }

    const signedDeploy = deploy.sign(signingKeys);

    return signedDeploy;
  }
}
