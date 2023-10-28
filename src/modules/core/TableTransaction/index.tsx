import { Box, BoxProps, Link } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { DataTable } from '@/components/Table/DataTable';
import { useGetTransactionHistories } from '@/hooks/queries/useGetTransactionHistories';
import i18n from '@/i18n';
import { getDeployStatus } from '@/utils/deployStatus';
import { getDeployHashUrl } from '@/utils/url';

const columnHelper = createColumnHelper<TransactionHistory>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<TransactionHistory, any>[] = [
  columnHelper.accessor('transferId', {
    cell: (info) => info.getValue(),
    header: () => i18n.t('transfer_id'),
  }),
  columnHelper.accessor('deployHash', {
    cell: (info) => (
      <Link href={getDeployHashUrl(info.getValue())} target="_blank">
        <MiddleTruncatedText value={info.getValue()} />
      </Link>
    ),
    header: () => i18n.t('deploy_hash'),
  }),
  columnHelper.accessor('fromPublicKeyHex', {
    cell: (info) => <MiddleTruncatedText value={info.getValue()} />,
    header: () => i18n.t('from_public_key'),
  }),
  columnHelper.accessor('toPublicKeyHex', {
    cell: (info) => <MiddleTruncatedText value={info.getValue()} />,
    header: () => i18n.t('to_public_key'),
  }),
  columnHelper.accessor('status', {
    cell: (info) => getDeployStatus(info.getValue()),
    header: 'Status',
  }),
  columnHelper.accessor('amount', {
    cell: (info) => {
      const { cell } = info;

      return i18n.t('intlAssetNumber', {
        val: info.getValue(),
        asset: cell.row.original.asset,
        number: 3,
      });
    },
    header: () => i18n.t('amount'),
  }),
  columnHelper.accessor('date', {
    cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DDTHH:mm:ss'),
    header: () => i18n.t('date'),
  }),
];

type TableTransactionProps = BoxProps;

const TableTransaction = ({ ...restProps }: TableTransactionProps) => {
  const { data = [] } = useGetTransactionHistories();

  return (
    <Box {...restProps} overflowX={'auto'} background={'white'} p="8">
      <DataTable
        columns={columns}
        data={data}
        w={{ base: '800px', md: '100%' }}
      />
    </Box>
  );
};

export default TableTransaction;
