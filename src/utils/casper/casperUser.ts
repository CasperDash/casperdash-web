import {
  DeployUtil,
  encodeBase16,
  formatMessageWithHeaders,
} from 'casper-js-sdk';
import { User, EncryptionType, WalletDescriptor } from 'casper-storage';
import { JsonTypes } from 'typedjson';

import UserService, { LoginOptions } from './user';
import { CacheKeyEnum, localStorageUtil } from '../localStorage';

class CasperUserUtil {
  /**
   * Only available after creating new User or successfully
   * validate a returning User (WelcomeBack)
   */
  private userService?: UserService;

  getCurrentUser = () => {
    return this.userService;
  };

  validateReturningUser = async ({ password }: { password: string }) => {
    const publicKey = localStorageUtil.get(CacheKeyEnum.PUBLIC_KEY);
    const loginOptions = localStorageUtil.get(CacheKeyEnum.LOGIN_OPTIONS);

    const { userCache, selectedWallet } = await UserService.makeUserFromCache(
      password,
      {
        publicKey,
        loginOptions,
      }
    );

    if (!userCache) {
      throw Error('Missing User');
    }
    const user = new UserService(userCache, {
      selectedWalletUID: selectedWallet.uid,
    });
    const result = await user.prepareStorageData(true);

    this.userService = user;

    return result;
  };

  createNewUser = async ({
    password,
    keyphrase,
    encryptionType = EncryptionType.Ed25519,
  }: {
    password: string;
    keyphrase: string;
    encryptionType: EncryptionType;
  }) => {
    if (!password) {
      throw Error('Missing password');
    }

    if (!keyphrase) {
      throw Error('Missing keyphrase');
    }

    // Create new User
    try {
      const opts = {
        encryptionType,
      };
      const user = new UserService(new User(password), opts);

      await user.initialize(keyphrase);

      this.userService = user;

      return await this.userService.prepareStorageData();
    } catch (error) {
      console.error(error);
      throw Error('Error on create new User');
    }
  };

  getPublicKey = async () => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    return this.userService.getPublicKey();
  };

  getCachedPublicKey = (): string | undefined => {
    const publicKey = localStorageUtil.get(CacheKeyEnum.PUBLIC_KEY);

    return publicKey;
  };

  getCachedLoginOptions = (): LoginOptions | undefined => {
    const loginOptions = localStorageUtil.get(CacheKeyEnum.LOGIN_OPTIONS);

    return loginOptions;
  };

  removeCachedWallet = () => {
    localStorageUtil.removeAll();
  };

  getKeyphrase = async () => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    return this.userService.getKeyphrase();
  };

  getWallets = async () => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }
    const wallets = (await this.userService.getWallets()) || [];

    return wallets;
  };

  addLegacyAccount = async ({
    privateKey,
    name,
  }: {
    privateKey: string;
    name: string;
  }) => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    const wallet = await this.userService.addLegacyAccount(name, privateKey);

    return wallet;
  };

  getWalletByIndex = async (index: number) => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    return this.userService.getWalletByIndex(index);
  };

  isUserExisted = () => {
    return !!this.userService;
  };

  signPrivateKeyProcess = async ({
    deployJSON,
  }: {
    deployJSON: { deploy: JsonTypes };
  }) => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    const asymKey = await this.userService.generateKeypair();
    if (!asymKey) {
      throw Error('Keypair can not generated');
    }
    const deployResult = DeployUtil.deployFromJson(deployJSON);

    if (deployResult.err) {
      throw Error('Something went wrong with deployResult');
    }

    const signedDeploy = deployResult.val.sign([asymKey]);

    return DeployUtil.deployToJson(signedDeploy);
  };

  signWithPrivateKey = async (
    deploy: DeployUtil.Deploy
  ): Promise<JsonTypes> => {
    const isValidated = DeployUtil.validateDeploy(deploy);
    if (!isValidated) {
      throw new Error('Something went wrong with deploy');
    }

    const deployJSON = DeployUtil.deployToJson(deploy);

    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    const asymKey = await this.userService.generateKeypair();
    if (!asymKey) {
      throw Error('Keypair can not generated');
    }

    const deployResult = DeployUtil.deployFromJson(deployJSON);

    if (deployResult.err) {
      console.log(deployResult.err);
      throw Error('Something went wrong with deployResult');
    }

    const signedDeploy = deployResult.val.sign([asymKey]);
    return DeployUtil.deployToJson(signedDeploy);
  };

  signMessage = async (message: string) => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    let messageBytes;
    try {
      messageBytes = formatMessageWithHeaders(message);
    } catch (err) {
      throw new Error('Could not format message: ' + err);
    }

    const result = await this.userService.signMessagePrivateKeyProcess({
      messageBytes,
    });

    return encodeBase16(result);
  };

  addNewAccount = async ({
    index,
    description,
  }: {
    index: number;
    description: Partial<WalletDescriptor>;
  }) => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    return this.userService.addWalletAccount(
      index,
      description as WalletDescriptor
    );
  };

  setSelectedWallet = async (uid: string): Promise<string | undefined> => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    await this.userService.setSelectedWallet(uid);

    return this.userService.getPublicKey(uid);
  };

  getPrivateKey = async ({ password }: { password: string }) => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    try {
      const { userDetails } = await this.validateReturningUser({ password });
      return this.userService.getPrivateKeyPEM(userDetails.selectedWallet.uid);
    } catch (error) {
      console.error(error);
      throw Error('Invalid password');
    }
  };

  getPrivateKeyByUID = async ({ uid }: { uid: string }) => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }

    return this.userService.getPrivateKeyPEM(uid);
  };
}
const casperUserUtil = new CasperUserUtil();

export default casperUserUtil;
