/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  WalletDescriptor,
  User,
  EncryptionType,
  CasperLegacyWallet,
  WalletInfo,
} from 'casper-storage';
import * as _ from 'lodash-es';

import { CacheKeyEnum, localStorageUtil } from '../localStorage';

export const CONNECTION_TYPES = {
  casperSigner: 'caspersigner',
  ledger: 'ledger',
  privateKey: 'privateKey',
};

export type LoginOptions = {
  userInfo: any;
  selectedWallet: {
    descriptor: WalletDescriptor;
    uid: string;
    encryptionType: EncryptionType;
  };
  connectionType: string;
};

/**
 * This class serves every tasks related to User
 * From extension to service worker and vice versa
 */
export class UserService {
  private _user: User | undefined;
  private selectedWalletUID?: string;
  private connectionType = CONNECTION_TYPES.privateKey;
  private encryptionType?: EncryptionType;

  static async makeUserFromCache(password: string, cacheConnectedAccount: any) {
    const {
      loginOptions: { userInfo: encryptedUserInfo, selectedWallet },
    } = cacheConnectedAccount;

    // Deserialize user info to an instance of User
    const userCache = await User.deserializeFrom(password, encryptedUserInfo);
    return { userCache, selectedWallet };
  }

  constructor(user: User, opts = {}) {
    this.instance = user;
    this.encryptionType = _.get(opts, 'encryptionType', EncryptionType.Ed25519);
    this.selectedWalletUID = _.get(opts, 'selectedWalletUID');
  }

  /**
   * Set User instane of casper-storage
   */
  set instance(user) {
    this._user = user;
  }

  /**
   * Get User instane of casper-storage
   */
  get instance() {
    if (!this._user) {
      throw new Error('user_not_f');
    }
    return this._user ?? undefined;
  }

  /**
   * Initialize with `keyphrase` passed when creating new User
   */
  initialize = async (keyphrase: string) => {
    const user = this.instance;
    if (!user) {
      throw new Error('User not found');
    }
    if (!this.encryptionType) {
      throw new Error('Encryption type not found');
    }
    // Set HDWallet info
    user.setHDWallet(keyphrase, this.encryptionType);
    await user.addWalletAccount(0, new WalletDescriptor('Account 1'));
    const wallets = user.getHDWallet().derivedWallets || [];
    const selectedWallet = wallets[0];

    this.setSelectedWallet(selectedWallet.uid);
    return user;
  };

  getWalletDetails = async (uid = '') => {
    const user = this.instance;
    if (!user) {
      return null;
    }
    const fullWalletInfo = user.getWalletInfo(uid);

    if (fullWalletInfo.isHDWallet) {
      const index = fullWalletInfo.index;
      const wallet = await user.getWalletAccount(index);
      return wallet;
    } else if (fullWalletInfo.isLegacy) {
      const wallet = new CasperLegacyWallet(
        fullWalletInfo.id,
        fullWalletInfo.encryptionType
      );
      return wallet;
    }
  };

  getPublicKey = async (uid?: string): Promise<string | undefined> => {
    try {
      const wallet = await this.getWalletDetails(uid);

      return wallet?.getPublicKey() ?? undefined;
    } catch (err) {
      // eslint-disable-next-line no-console
      return undefined;
    }
  };

  /**
   * Return a pair of User login info after creating new User
   * @returns {  userInfo }
   */
  getUserInfoHash = async () => {
    const user = this.instance;

    // Serialize user information to a secure encrypted string
    const userInfo = await user.serialize();

    return userInfo;
  };

  /* Storing the public key and login options in the chrome storage. */
  storeData = (publicKey: string, loginOptions: LoginOptions) => {
    if (publicKey) {
      localStorageUtil.set(CacheKeyEnum.PUBLIC_KEY, publicKey ?? '');
    }
    const storedLoginOptions = localStorageUtil.get(CacheKeyEnum.LOGIN_OPTIONS);

    localStorageUtil.set(CacheKeyEnum.LOGIN_OPTIONS, {
      ...(!_.isEmpty(storedLoginOptions) && storedLoginOptions),
      ...loginOptions,
    });
  };

  /**
   * Return full data needed for storing in redux store
   * and Google chrome storage API
   * isLoad : no need to store data if loading user
   * @returns
   */
  prepareStorageData = async (isLoad = false, uid?: string) => {
    /**
     * Ignore removing `await` from Sonarcloud audit.
     * This will return user info with hash info
     */
    const user = this.instance;
    if (!user) {
      throw new Error('user_not_found');
    }
    const userInfo = await this.getUserInfoHash();
    const publicKey = await this.getPublicKey(uid || this.selectedWalletUID);
    if (!publicKey) {
      throw new Error('public_key_not_found');
    }
    const walletDetails = await this.getWalletDetails(
      uid || this.selectedWalletUID
    );
    if (!walletDetails) {
      throw new Error('wallet_details_not_found');
    }
    const wallet = user.getWalletInfo(walletDetails.getReferenceKey());

    const selectedWallet = {
      descriptor: wallet.descriptor,
      uid: wallet.uid,
      encryptionType: wallet.encryptionType,
    };
    if (!isLoad) {
      this.storeData(publicKey, {
        userInfo,
        selectedWallet,
        connectionType: this.connectionType,
      });
    }

    return {
      publicKey,
      userDetails: {
        selectedWallet,
        connectionType: this.connectionType,
      },
    };
  };

  getWallets = async (): Promise<WalletInfo[]> => {
    const user = this.instance;

    const wallets = user.getHDWallet().derivedWallets || [];
    const legacyWallets = user.getLegacyWallets() || [];
    if (wallets.length === 0 && legacyWallets.length === 0) {
      return [];
    }

    const walletInfos = await Promise.all(
      wallets.concat(legacyWallets).map(async (wallet) => ({
        //should not spread wallet here, wallet have some sensitive info
        descriptor: wallet.descriptor,
        uid: wallet.uid,
        encryptionType: wallet.encryptionType,
        publicKey: await this.getPublicKey(wallet.uid),
      }))
    );

    return <WalletInfo[]>(<unknown>walletInfos);
  };

  addWalletAccount = async (index: number, description: WalletDescriptor) => {
    const user = this.instance;
    user.addWalletAccount(index, description);
    return await this.prepareStorageData();
  };

  getKeyphrase = async () => {
    const user = this.instance;

    return user.getHDWallet().keyPhrase;
  };

  setSelectedWallet = (uid: string) => {
    this.selectedWalletUID = uid;
  };
}

export default UserService;