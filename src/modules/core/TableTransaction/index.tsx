import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Transaction } from './type';
import Paper from '@/components/Paper';
import { DataTable } from '@/components/Table/DataTable';

const transactions: Transaction[] = [
  {
    name: 'John',
    type: 'Withdrawal',
    transactionHash: '0x98d5fb...',
    transferId: 'TR5678',
    value: '25.00',
    status: 'Complete',
    date: '2022-01-10',
  },
  {
    name: 'Mary',
    type: 'Deposit',
    transactionHash: '0xdee5bc...',
    transferId: 'TR1234',
    value: '1000.00',
    status: 'Pending',
    date: '2022-01-11',
  },
  {
    name: 'Bob',
    type: 'Transfer',
    transactionHash: '0xa1b2c3...',
    transferId: 'TR9876',
    value: '50.00',
    status: 'Failed',
    date: '2022-01-12',
  },
];
const columnHelper = createColumnHelper<Transaction>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<Transaction, any>[] = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'Name',
  }),
  columnHelper.accessor('type', {
    cell: (info) => info.getValue(),
    header: 'Type',
  }),
  columnHelper.accessor('transactionHash', {
    cell: (info) => info.getValue(),
    header: 'Transaction Hash',
  }),
  columnHelper.accessor('transferId', {
    cell: (info) => info.getValue(),
    header: 'Transfer ID',
  }),
  columnHelper.accessor('value', {
    cell: (info) => info.getValue(),
    header: 'Value',
  }),
  columnHelper.accessor('status', {
    cell: (info) => info.getValue(),
    header: 'Status',
  }),
  columnHelper.accessor('date', {
    cell: (info) => info.getValue(),
    header: 'Date',
  }),
];

type TableTransactionProps = BoxProps;

const TableTransaction = ({ ...restProps }: TableTransactionProps) => {
  return (
    <Box {...restProps}>
      <Box>
        <Flex></Flex>
        <Box></Box>
      </Box>
      <Paper py="5" px="8">
        <DataTable columns={columns} data={transactions} />
      </Paper>
    </Box>
  );
};

export default TableTransaction;
