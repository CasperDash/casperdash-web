import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';
import _ from 'lodash';

interface Props extends FlexProps {
  pageIndex: number;
  totalPage: number;
  range?: number;
  onChangePage: (pageIndex: number) => void;
  canNextPage?: boolean;
  canPreviousPage?: boolean;
}

const PaginationItem: React.FC<
  { active?: boolean; disabled?: boolean } & FlexProps
> = ({ children, active = false, disabled = false, ...restProps }) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        w: '40px',
        h: '40px',

        border: '1px solid',
        borderRight: 0,
        borderColor: active ? '#3db8bd' : 'gray.200',
        background: active ? '#3db8bd' : 'transparent',
        color: active ? '#ffffff' : 'unset',

        transition: '0.2s ease',
        cursor: 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? '0.5' : '1',

        '&:last-child': {
          borderRight: '1px solid',
          borderColor: 'gray.100',
        },
      }}
      _hover={{
        filter: 'brightness(0.9)',
      }}
      {...restProps}
    >
      {children}
    </Flex>
  );
};

const Pagination = ({
  pageIndex,
  totalPage,
  range = 1,
  onChangePage,
  canNextPage,
  canPreviousPage,
  ...restProps
}: Props) => {
  const renderPagination = (
    range: number,
    pageIndex: number,
    totalPage: number
  ) => {
    const array = Array.from(Array(totalPage).keys());
    const page = pageIndex + 1;
    const min = page - range;
    const max = page + range;

    return array.reduce((cur: (number | string)[], acc: number) => {
      const moreString = '...';

      // handle UI jerking if page > 6
      const isStartPage = page < 4 ? pageIndex < 6 : pageIndex === 1;
      const isEndPage =
        page > totalPage - 4
          ? pageIndex > totalPage - 5
          : pageIndex === totalPage;
      const isOutRange = pageIndex < min || pageIndex > max;

      if (isStartPage || isEndPage || !isOutRange) {
        return [...cur, acc];
      }

      if (cur[cur.length - 1] === moreString) {
        return cur;
      }

      return [...cur, moreString];
    }, []);
  };

  return (
    <Flex {...restProps}>
      <PaginationItem
        onClick={() => onChangePage(pageIndex - 1)}
        disabled={!canPreviousPage}
      >
        {'<'}
      </PaginationItem>

      {renderPagination(range, pageIndex, totalPage).map((item, index) => {
        return (
          <PaginationItem
            onClick={() => _.isNumber(item) && onChangePage(item)}
            active={item === pageIndex}
            key={index}
          >
            {_.isNumber(item) ? item + 1 : item}
          </PaginationItem>
        );
      })}

      <PaginationItem
        disabled={!canNextPage}
        onClick={() => onChangePage(pageIndex + 1)}
      >
        {'>'}
      </PaginationItem>
    </Flex>
  );
};

export default Pagination;
