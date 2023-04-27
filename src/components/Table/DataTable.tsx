/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Image,
  Box,
  TableProps,
} from '@chakra-ui/react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import EmptyImg from '@/assets/img/empty.png';

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, unknown>[];
} & TableProps;

export function DataTable<Data extends object>({
  data,
  columns,
  ...restProps
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const rows = table.getRowModel().rows;

  return (
    <Table pos="relative" {...restProps}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'desc' ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      {rows && rows.length > 0 ? (
        <Tbody>
          {rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      ) : (
        <Tbody>
          <Tr>
            <Box m="auto" h="200">
              <Box
                pos="absolute"
                top="50%"
                left="50%"
                marginRight="-50%"
                transform="translate(-50%, -50%)"
              >
                <Image src={EmptyImg} alt="empty" width="140" height="100" />
              </Box>
            </Box>
          </Tr>
        </Tbody>
      )}
    </Table>
  );
}
