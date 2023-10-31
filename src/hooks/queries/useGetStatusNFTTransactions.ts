import { useMemo } from 'react';

import { useGetTransactions } from './useGetTransactions';
import { useAccount } from '../useAccount';
import { DeployContextEnum } from '@/enums/deployContext';
import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';
import { NFTTransactionHistory } from '@/typings/nftTransactionHistory';

type Params = {
  filterFn: (transaction: NFTTransactionHistory) => boolean;
  queryKey: string | string[] | Record<string, string>;
  context: DeployContextEnum;
};

export type NFTTransactionStatus = NFTTransactionHistory & {
  isSuccess: boolean;
  isPending: boolean;
  isFailed: boolean;
};

export const useGetStatusNFTTransactions = (params: Params) => {
  const { publicKey } = useAccount();
  const { data: transactions, ...rest } = useGetTransactions(publicKey);

  const filteredTransactions = useMemo(() => {
    const foundTransactions = transactions?.filter(
      (transaction: NFTTransactionHistory) => params?.filterFn(transaction)
    );

    if (!foundTransactions || foundTransactions.length === 0) {
      return undefined;
    }

    return foundTransactions.map((transaction: NFTTransactionHistory) => {
      return {
        ...transaction,
        isSuccess: transaction.status === TransactionStatusEnum.COMPLETED,
        isPending: ![
          TransactionStatusEnum.COMPLETED,
          TransactionStatusEnum.FAILED,
        ].includes(transaction.status),
        isFailed: transaction.status === TransactionStatusEnum.FAILED,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  return {
    ...rest,
    data: filteredTransactions,
  };
};

export const useGetLastNFTTransactionStatus = (params: Params) => {
  const { data, isLoading } = useGetStatusNFTTransactions(params);

  if (isLoading) {
    return {
      isLoading: true,
      isSuccess: false,
    };
  }

  if (!data || data.length === 0) {
    return {
      isLoading: false,
      isSuccess: false,
    };
  }

  const lastTransaction = data[0] as NFTTransactionStatus;

  return {
    isLoading: lastTransaction.isPending,
    isSuccess: lastTransaction?.isSuccess,
    data: lastTransaction,
  };
};
