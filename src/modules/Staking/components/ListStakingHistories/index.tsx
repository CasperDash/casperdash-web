import { useMemo } from 'react';

import { Center, Flex, FlexProps, Link, Spinner, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { useGetStakingTransactions } from '../../hooks/useGetStakingTransactions';
import AssetText from '@/components/Common/AssetText';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import Validator from '@/components/Common/Validator';
import { DataTable } from '@/components/Table/DataTable';
import { IValidator, useGetValidators } from '@/hooks/queries/useGetValidators';
import i18n from '@/i18n';
import { TransactionHistory } from '@/typings/transactionHistory';
import { formatReadableDate } from '@/utils/date';
import { getDeployStatus } from '@/utils/deployStatus';
import { getDeployHashUrl } from '@/utils/url';

type ListRewardsProps = FlexProps;
type TransactionWithValidator = TransactionHistory & {
  validatorName?: string;
  validatorLogo?: string;
};

const columnHelper = createColumnHelper<TransactionWithValidator>();

const ListStakingHistories = (props: ListRewardsProps) => {
  const { data: validators = [], isLoading: isLoadingValidators } =
    useGetValidators();
  const { transactions = [], isLoading: isLoadingTransactions } =
    useGetStakingTransactions();

  const columns: ColumnDef<TransactionWithValidator, any>[] = [
    columnHelper.accessor('args.validator', {
      cell: ({ cell }) => {
        const { args, validatorLogo, validatorName } = cell.row.original;
        return (
          <Validator
            name={validatorName}
            logo={validatorLogo}
            publicKey={(args?.validator as string) || ''}
            alignItems={'center'}
            minW="40"
          />
        );
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>
          {i18n.t('validator')}
        </Text>
      ),
    }),
    columnHelper.accessor('date', {
      cell: (info) => {
        return <Text w="44">{formatReadableDate(info.getValue())}</Text>;
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>{i18n.t('date')}</Text>
      ),
    }),
    columnHelper.accessor('action', {
      cell: (info) => {
        return <Text>{info.getValue()}</Text>;
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>{i18n.t('action')}</Text>
      ),
    }),
    columnHelper.accessor('args.amount', {
      cell: (info) => {
        return <AssetText value={info.getValue()} asset="CSPR" />;
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>{i18n.t('amount')}</Text>
      ),
    }),
    columnHelper.accessor('deployHash', {
      cell: (info) => {
        return (
          <Link
            href={getDeployHashUrl(info.getValue())}
            target="_blank"
            rel="noopender"
          >
            <MiddleTruncatedText value={info.getValue()} />
          </Link>
        );
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>
          {i18n.t('deploy_hash')}
        </Text>
      ),
    }),
    columnHelper.accessor('status', {
      cell: (info) => {
        return <Text>{getDeployStatus(info.getValue())}</Text>;
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>{i18n.t('status')}</Text>
      ),
    }),
  ];

  const delegatorRewardsWithValidator: TransactionWithValidator[] =
    useMemo(() => {
      return transactions.map((transaction) => {
        const foundValidator = validators.find(
          (validator: IValidator) =>
            validator.validatorPublicKey === transaction.args?.validator
        );

        return {
          ...transaction,
          validatorName: foundValidator?.name,
          validatorLogo: foundValidator?.logo,
        };
      });
    }, [transactions, validators]);

  if (isLoadingValidators || isLoadingTransactions) {
    return (
      <Center mt="8">
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex {...props} direction="column">
      <DataTable data={delegatorRewardsWithValidator} columns={columns} />
    </Flex>
  );
};

export default ListStakingHistories;
