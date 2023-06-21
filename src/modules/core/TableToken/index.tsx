import { useMemo } from 'react';

import { Box, BoxProps, Button, Flex, Image, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import TableTokenHeader from './Header';
import CSPRCoin from '@/assets/img/coins/cspr.png';
import AssetText from '@/components/Common/AssetText';
import Paper from '@/components/Paper';
import { DataTable } from '@/components/Table/DataTable';
import { PathEnum } from '@/enums';
import { useGetCurrentBalance } from '@/hooks/queries/useGetCurrentBalance';
import { useGetMyTokens } from '@/hooks/queries/useGetMyTokens';
import { useAccount } from '@/hooks/useAccount';
import i18n from '@/i18n';
import { Token } from '@/typings/token';

const columnHelper = createColumnHelper<Token>();

type TableTokenProps = BoxProps;

const TableToken = ({ ...restProps }: TableTokenProps) => {
  const { isConnected } = useAccount();
  const { data: tokens = [] } = useGetMyTokens();
  const { data: { balance } = { balance: 0 } } = useGetCurrentBalance();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Token, any>[] = [
    columnHelper.accessor('name', {
      cell: ({ cell }) => {
        const { name, symbol, icon } = cell.row.original;
        return (
          <Flex>
            <Box
              w="40px"
              h="40px"
              minW="40px"
              p="3"
              bg={'#fbd2d3'}
              borderRadius={'full'}
            >
              <Image src={icon} width="20px" height="20px" ml="1px" />
            </Box>
            <Flex ml="3" direction={'column'} justifyContent={'space-around'}>
              <Text>{name}</Text>
              <Text color="gray.500">{symbol}</Text>
            </Flex>
          </Flex>
        );
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>{i18n.t('name')}</Text>
      ),
    }),
    columnHelper.accessor('balance', {
      cell: (info) => {
        return (
          <AssetText value={info.getValue()} asset={info.row.original.symbol} />
        );
      },
      header: () => (
        <Text display={{ base: 'none', md: 'block' }}>{i18n.t('balance')}</Text>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: 'action',
      cell: ({ cell }) => {
        if (!isConnected) {
          return null;
        }
        const { tokenAddress } = cell.row.original;

        return (
          <Flex justifyContent={'flex-end'}>
            <Link
              to={{
                pathname: PathEnum.SEND,
                search: tokenAddress && `?tokenAddress=${tokenAddress}`,
              }}
            >
              <Button w={{ base: 'auto', md: '5xs' }} variant={'light-outline'}>
                {i18n.t('send')}
              </Button>
            </Link>
          </Flex>
        );
      },
      header: () => '',
    }),
  ];

  const concatedTokens = useMemo(() => {
    const csprToken: Token = {
      name: 'Casper',
      symbol: 'CSPR',
      balance,
      icon: CSPRCoin,
      decimals: 1,
      tokenAddress: '',
    };

    return [csprToken, ...tokens];
  }, [balance, tokens]);

  return (
    <Box {...restProps}>
      <Paper py="5" px="8">
        <TableTokenHeader />
        <Box mt="4">
          <DataTable columns={columns} data={concatedTokens} />
        </Box>
      </Paper>
    </Box>
  );
};

export default TableToken;
