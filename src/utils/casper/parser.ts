/* eslint-disable */
// @ts-nocheck
import {
  CLAccountHash,
  CLList,
  CLPublicKey,
  CLTypeTag,
  CLValue,
  DeployUtil,
  encodeBase16,
} from 'casper-js-sdk';
import { JsonTypes } from 'typedjson';

type Params = {
  deploy: {
    deploy: JsonTypes;
  };
  signingPublicKeyHex?: string;
  targetPublicKeyHex: string;
};

export const parseDeployData = async ({
  deploy: deployJson,
  targetPublicKeyHex,
  signingPublicKeyHex,
}: Params) => {
  let innerDeploy = DeployUtil.deployFromJson(deployJson);
  if (!innerDeploy.ok) {
    return {};
  }
  const deploy = innerDeploy.unwrap();
  const type = getDeployType(deploy);
  const deployPayment = getDeployPayment(deploy);
  const deployArgs = getDeployArgs(deploy, targetPublicKeyHex);
  const deployAccount = deploy.header.account.toHex();

  return {
    deployHash: encodeBase16(deploy.hash),
    signingKey: signingPublicKeyHex,
    account: deployAccount,
    bodyHash: encodeBase16(deploy.header.bodyHash),
    chainName: deploy.header.chainName,
    timestamp: new Date(deploy.header.timestamp).toLocaleString(),
    gasPrice: deploy.header.gasPrice.toString(),
    payment: deployPayment,
    deployType: type,
    deployArgs: deployArgs,
  };
};

export function getDeployPayment(deploy: DeployUtil.Deploy) {
  return deploy?.payment.moduleBytes
    ?.getArgByName('amount')
    ?.value()
    .toString();
}

export function getDeployType(deploy: DeployUtil.Deploy) {
  return deploy.isTransfer()
    ? 'Transfer'
    : deploy.session.isModuleBytes()
    ? 'WASM-Based Deploy'
    : deploy.session.isStoredContractByHash() ||
      deploy.session.isStoredContractByName()
    ? 'Contract Call'
    : 'Contract Package Call';
}

export function getDeployArgs(deploy: DeployUtil.Deploy, targetKey: string) {
  let deployArgs = {};

  if (deploy.session.transfer) {
    deployArgs = parseTransferData(deploy.session.transfer, targetKey);

    return deployArgs;
  }

  if (deploy.session.moduleBytes) {
    deploy.session.moduleBytes.args.args.forEach((argument, key) => {
      deployArgs[key] = parseDeployArg(argument);
    });
    deployArgs['module_bytes'] =
      deploy.session.moduleBytes.moduleBytes.toString();

    return deployArgs;
  }

  const storedContract = getStoredContracts(deploy);
  storedContract.args.args.forEach((argument, key) => {
    deployArgs[key] = parseDeployArg(argument);
  });
  deployArgs['entry_point'] = storedContract.entryPoint;

  return deployArgs;
}

export const parseTransferData = (transferDeploy, providedTarget) => {
  const transferArgs = {};
  let targetFromDeployHex;

  const targetFromDeploy = transferDeploy.getArgByName('target');
  switch (targetFromDeploy.clType().tag) {
    case CLTypeTag.ByteArray:
      targetFromDeployHex = encodeBase16(targetFromDeploy.value());
      if (providedTarget) {
        verifyTargetAccountMatch(
          providedTarget.toLowerCase(),
          targetFromDeployHex
        );
      }
      transferArgs['Recipient (Hash)'] = targetFromDeployHex;
      break;
    case CLTypeTag.PublicKey:
      targetFromDeployHex = targetFromDeploy.toHex();
      // if (providedTarget && targetFromDeployHex !== providedTarget) {
      //   throw new Error(
      //     'The provided target public key does not match the one specified in the deploy.'
      //   );
      // }
      transferArgs['Recipient (Key)'] = targetFromDeployHex;
      break;
    default:
      throw new Error(
        'The target specified in the deploy is not in the correct format, it must be either an AccountHash or a PublicKey.'
      );
  }

  transferArgs['Amount'] = transferDeploy
    .getArgByName('amount')
    .value()
    .toString();
  transferArgs['Transfer ID'] = transferDeploy
    .getArgByName('id')
    .value()
    .unwrap()
    .value()
    .toString();

  return transferArgs;
};

// eslint-disable-next-line complexity
export function parseDeployArg(arg: CLValue) {
  if (!(arg instanceof CLValue)) {
    throw new Error('Argument should be a CLValue, received: ' + typeof arg);
  }
  const tag = arg.clType().tag;
  switch (tag) {
    case CLTypeTag.Unit:
      return String('CLValue Unit');

    case CLTypeTag.Key: {
      const key = arg;
      const value = key.value();
      if (key.isAccount() || key.isURef() || key.isHash()) {
        return parseDeployArg(value);
      }
      throw new Error('Failed to parse key argument');
    }

    case CLTypeTag.URef:
      return arg.toFormattedStr();

    case CLTypeTag.Option: {
      const option = arg;
      if (option.isSome()) {
        return parseDeployArg(option.value().unwrap());
      } else {
        const optionValue = option.value().toString();
        const optionCLType = option.clType().toString().split(' ')[1];
        return `${optionValue} ${optionCLType}`;
      }
    }

    case CLTypeTag.List: {
      const list = arg.value();
      const parsedList = list.map((member) => {
        return sanitiseNestedLists(member);
      });
      return parsedList;
    }

    case CLTypeTag.ByteArray: {
      const bytes = arg.value();
      return encodeBase16(bytes);
    }

    case CLTypeTag.Result: {
      const result = arg;
      const status = result.isOk() ? 'OK:' : 'ERR:';
      const parsed = parseDeployArg(result.value().val);
      return `${status} ${parsed}`;
    }

    case CLTypeTag.Map:
      return arg.value().toString();

    case CLTypeTag.Tuple1:
      return parseDeployArg(arg.value()[0]);

    case CLTypeTag.Tuple2:
    case CLTypeTag.Tuple3:
      return arg.value().map((member) => parseDeployArg(member));

    case CLTypeTag.PublicKey:
      return arg.toHex();

    default:
      if (arg instanceof CLAccountHash) {
        return encodeBase16(arg.value());
      }

      return arg.value().toString();
  }
}

export function getStoredContracts(deploy) {
  if (deploy.session.storedContractByHash) {
    return deploy.session.storedContractByHash;
  }

  if (deploy.session.storedContractByName) {
    return deploy.session.storedContractByName;
  }

  if (deploy.session.storedVersionedContractByHash) {
    return deploy.session.storedVersionedContractByHash;
  }

  if (deploy.session.storedVersionedContractByName) {
    return deploy.session.storedVersionedContractByName;
  }

  throw new Error(`Can not parse stored contract: ${deploy.session}`);
}

export function sanitiseNestedLists(value: CLValue): string {
  const parsedValue = parseDeployArg(value);
  if (Array.isArray(parsedValue)) {
    const parsedType = (value as CLList<CLValue>).vectorType;
    return `<${parsedType}>[...]`;
  }
  return parsedValue;
}

export function verifyTargetAccountMatch(
  publicKeyHex: string,
  targetAccountHash: string
) {
  const providedTargetKeyHash = encodeBase16(
    CLPublicKey.fromHex(publicKeyHex).toAccountHash()
  );

  if (providedTargetKeyHash !== targetAccountHash) {
    throw new Error(
      "Provided target public key doesn't match the one in deploy"
    );
  }
}
