import { useMemo } from 'react';

import {
  Center,
  Flex,
  FlexProps,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import StakedActionItem from './ActionItem';
import AssetText from '@/components/Common/AssetText';
import { DataTable } from '@/components/Table/DataTable';
import { useGetDelegation } from '@/hooks/queries/useGetDelegation';
import { IValidator, useGetValidators } from '@/hooks/queries/useGetValidators';
import { useAccount } from '@/hooks/useAccount';
import i18n from '@/i18n';
import { toCSPR } from '@/utils/currency';

type ListStakedsProps = FlexProps;

interface IValidatorStaked extends IValidator {
  stakedAmount?: string;
}

const columnHelper = createColumnHelper<IValidatorStaked>();

const ListStakeds = (props: ListStakedsProps) => {
  const { publicKey } = useAccount();
  const { data: validators = [], isLoading: isLoadingValidators } =
    useGetValidators();
  const { data: listStakeds = [], isLoading: isLoadingDelegation } =
    useGetDelegation(publicKey);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<IValidatorStaked, any>[] = [
    columnHelper.accessor('name', {
      cell: ({ cell }) => {
        const { name, logo } = cell.row.original;
        return (
          <Flex alignItems={'center'}>
            <Image
              src={logo}
              width="30px"
              height="30px"
              ml="1px"
              borderRadius={'full'}
            />
            <Flex ml="3" direction={'column'} justifyContent={'space-around'}>
              <Text>{name}</Text>
            </Flex>
          </Flex>
        );
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>
          {i18n.t('validator')}
        </Text>
      ),
    }),
    columnHelper.accessor('stakedAmount', {
      cell: (info) => {
        return <AssetText value={toCSPR(info.getValue())} asset={'CSPR'} />;
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>
          {i18n.t('staked_amount')}
        </Text>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: 'action',
      cell: ({ cell }) => {
        const { stakedAmount } = cell.row.original;
        return (
          <StakedActionItem
            validator={cell.row.original}
            amount={toCSPR(stakedAmount || 0)}
          />
        );
      },
      header: () => '',
    }),
  ];

  const validatorStaked: IValidatorStaked[] = useMemo(() => {
    return listStakeds
      .map((staked): IValidatorStaked | null => {
        const foundValidator = validators.find(
          (validator: IValidator) =>
            validator.validatorPublicKey === staked.validatorPublicKey
        );

        if (!foundValidator) {
          return null;
        }

        return {
          ...foundValidator,
          stakedAmount: staked.stakedAmount,
        };
      })
      .filter(
        (validator: IValidatorStaked | null) => validator !== null
      ) as IValidatorStaked[];
  }, [listStakeds, validators]);

  if (isLoadingValidators || isLoadingDelegation) {
    return (
      <Center mt="8">
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex {...props} direction="column">
      <DataTable data={validatorStaked} columns={columns} />
    </Flex>
  );
};

export default ListStakeds;
