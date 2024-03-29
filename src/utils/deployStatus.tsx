import React from 'react';

import { Badge } from '@chakra-ui/react';

import { TransactionStatusEnum } from '@/enums/transactionStatusEnum';

export const getDeployStatus = (status: TransactionStatusEnum) => {
  switch (status) {
    case TransactionStatusEnum.PENDING:
    case TransactionStatusEnum.UNDELEGATING:
      return (
        <Badge colorScheme="orange" p="1.5" borderRadius="md">
          {status.toUpperCase()}
        </Badge>
      );
    case TransactionStatusEnum.COMPLETED:
      return (
        <Badge colorScheme="green" p="1.5" borderRadius="md">
          {status.toUpperCase()}
        </Badge>
      );
    default:
      return (
        <Badge colorScheme="red" p="1.5" borderRadius="md">
          {status.toUpperCase()}
        </Badge>
      );
  }
};
