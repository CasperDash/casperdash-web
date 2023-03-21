import { User, EncryptionType } from 'casper-storage';

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
    try {
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
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
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

  getWallets = async () => {
    if (!this.userService) {
      throw new Error('Missing UserService instance');
    }
    const wallets = (await this.userService.getWallets()) || [];

    return wallets;
  };
}

const casperUserUtil = new CasperUserUtil();

export default casperUserUtil;
