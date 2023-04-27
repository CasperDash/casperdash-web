import { Box, BoxProps, Button, Flex, Image, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import TableTokenHeader from './Header';
import Paper from '@/components/Paper';
import { DataTable } from '@/components/Table/DataTable';
import { PathEnum } from '@/enums';
import { useGetMyTokens } from '@/hooks/queries/useGetMyTokens';
import i18n from '@/i18n';
import { Token } from '@/typings/token';
import { getBase64IdentIcon } from '@/utils/icon';

const columnHelper = createColumnHelper<Token>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<Token, any>[] = [
  columnHelper.accessor('name', {
    cell: ({ cell }) => {
      const { name, symbol, tokenAddress } = cell.row.original;
      return (
        <Flex>
          <Box w="40px" h="40px" p="3" bg={'#fbd2d3'} borderRadius={'full'}>
            <Image
              src={getBase64IdentIcon(tokenAddress)}
              width="20px"
              height="20px"
              ml="1px"
            />
          </Box>
          <Flex ml="3" direction={'column'} justifyContent={'space-around'}>
            <Text>{name}</Text>
            <Text color="gray.500">{symbol}</Text>
          </Flex>
        </Flex>
      );
    },
    header: () => i18n.t('name'),
  }),
  columnHelper.accessor('balance', {
    cell: (info) => info.getValue(),
    header: () => i18n.t('balance'),
  }),
  columnHelper.accessor((row) => row, {
    id: 'action',
    cell: ({ cell }) => {
      const { tokenAddress } = cell.row.original;

      return (
        <Flex justifyContent={'flex-end'}>
          <Link
            to={{
              pathname: PathEnum.SEND,
              search: `?tokenAddress=${tokenAddress}`,
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

type TableTokenProps = BoxProps;

const TableToken = ({ ...restProps }: TableTokenProps) => {
  const { data: tokens = [] } = useGetMyTokens();

  return (
    <Box {...restProps}>
      <Paper py="5" px="8">
        <TableTokenHeader />
        <Box mt="4">
          <DataTable columns={columns} data={tokens} />
        </Box>
      </Paper>
    </Box>
  );
};

export default TableToken;
