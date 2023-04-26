import { Box, BoxProps } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import TableTokenHeader from './Header';
import Paper from '@/components/Paper';
import { DataTable } from '@/components/Table/DataTable';
import { useGetMyTokens } from '@/hooks/queries/useGetMyTokens';
import i18n from '@/i18n';
import { Token } from '@/typings/token';

const columnHelper = createColumnHelper<Token>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<Token, any>[] = [
  columnHelper.accessor('imageUrl', {
    cell: (info) => info.getValue(),
    header: () => '',
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: () => i18n.t('name'),
  }),
  columnHelper.accessor('symbol', {
    cell: (info) => info.getValue(),
    header: () => i18n.t('symbol'),
  }),
  columnHelper.accessor('balance', {
    cell: (info) => info.getValue(),
    header: () => i18n.t('balance'),
  }),
];

type TableTokenProps = BoxProps;

const TableToken = ({ ...restProps }: TableTokenProps) => {
  const { data: tokens = [] } = useGetMyTokens();
  console.log('tokens: ', tokens);
  return (
    <Box {...restProps}>
      <Paper py="5" px="8">
        <TableTokenHeader />
        <Box mt="4" overflowX={'auto'}>
          <DataTable columns={columns} data={tokens} />
        </Box>
      </Paper>
    </Box>
  );
};

export default TableToken;
