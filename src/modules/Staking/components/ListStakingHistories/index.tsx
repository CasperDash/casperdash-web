import { useMemo } from 'react';

import { Center, Flex, FlexProps, Link, Spinner, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import AssetText from '@/components/Common/AssetText';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import Validator from '@/components/Common/Validator';
import { DataTable } from '@/components/Table/DataTable';
import { useGetStakingTransactionHistories } from '@/hooks/queries/useGetStakingTransactionHistories';
import { IValidator, useGetValidators } from '@/hooks/queries/useGetValidators';
import i18n from '@/i18n';
import { StakingTransactionHistory } from '@/typings/stakingTransactionHistory';
import { formatReadDate } from '@/utils/date';
import { getDeployStatus } from '@/utils/deployStatus';
import { getDeployHashUrl } from '@/utils/url';

type ListRewardsProps = FlexProps;
type TransactionWithValidator = StakingTransactionHistory & {
  validatorName?: string;
  validatorLogo?: string;
};

const columnHelper = createColumnHelper<TransactionWithValidator>();

const ListStakingHistories = (props: ListRewardsProps) => {
  const { data: validators = [], isLoading: isLoadingValidators } =
    useGetValidators();
  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useGetStakingTransactionHistories();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<TransactionWithValidator, any>[] = [
    columnHelper.accessor('validatorPublicKeyHex', {
      cell: ({ cell }) => {
        const { validatorPublicKeyHex, validatorLogo, validatorName } =
          cell.row.original;
        return (
          <Validator
            name={validatorName}
            logo={validatorLogo}
            publicKey={validatorPublicKeyHex}
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
        return <Text w="44">{formatReadDate(info.getValue())}</Text>;
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
    columnHelper.accessor('amount', {
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
    // columnHelper.accessor((row) => row, {
    //   id: 'action',
    //   cell: ({ cell }) => {
    //     return <div></div>;
    //   },
    //   header: () => '',
    // }),
  ];

  const delegatorRewardsWithValidator: TransactionWithValidator[] =
    useMemo(() => {
      return transactions.map((transaction) => {
        const foundValidator = validators.find(
          (validator: IValidator) =>
            validator.validatorPublicKey === transaction.validatorPublicKeyHex
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
