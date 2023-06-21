import { useMemo } from 'react';

import { Center, Flex, FlexProps, Spinner, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import AssetText from '@/components/Common/AssetText';
import Validator from '@/components/Common/Validator';
import { DataTable } from '@/components/Table/DataTable';
import { useGetDelegatorRewards } from '@/hooks/queries/useGetDelegatorRewards';
import { IValidator, useGetValidators } from '@/hooks/queries/useGetValidators';
import { useAccount } from '@/hooks/useAccount';
import i18n from '@/i18n';
import { DelegatorReward } from '@/services/cspr/delegator/type';
import { formatReadDate } from '@/utils/date';

type ListRewardsProps = FlexProps;
type DelegatorRewardWithValidator = DelegatorReward & {
  validatorName?: string;
  validatorLogo?: string;
};

const columnHelper = createColumnHelper<DelegatorRewardWithValidator>();

const ListRewards = (props: ListRewardsProps) => {
  const { publicKey } = useAccount();
  const { data: validators = [], isLoading: isLoadingValidators } =
    useGetValidators();
  const {
    data: { data: delegatorRewards } = { data: [] },
    isLoading: isLoadingDelegatorRewards,
  } = useGetDelegatorRewards({
    publicKey,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<DelegatorRewardWithValidator, any>[] = [
    columnHelper.accessor('validatorPublicKey', {
      cell: ({ cell }) => {
        const { validatorPublicKey, validatorLogo, validatorName } =
          cell.row.original;
        return (
          <Validator
            name={validatorName}
            logo={validatorLogo}
            publicKey={validatorPublicKey}
            alignItems={'center'}
          />
        );
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>
          {i18n.t('validator')}
        </Text>
      ),
    }),
    columnHelper.accessor('timestamp', {
      cell: (info) => {
        return <Text>{formatReadDate(info.getValue())}</Text>;
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>{i18n.t('date')}</Text>
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
  ];

  const delegatorRewardsWithValidator: DelegatorRewardWithValidator[] =
    useMemo(() => {
      return delegatorRewards.map((delegatorReward) => {
        const foundValidator = validators.find(
          (validator: IValidator) =>
            validator.validatorPublicKey === delegatorReward.validatorPublicKey
        );

        return {
          ...delegatorReward,
          validatorName: foundValidator?.name,
          validatorLogo: foundValidator?.logo,
        };
      });
    }, [delegatorRewards, validators]);

  if (isLoadingValidators || isLoadingDelegatorRewards) {
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

export default ListRewards;
