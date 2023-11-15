import { useRef } from 'react';

import { Box, Center, Spinner } from '@chakra-ui/react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import ValidatorItem from '../ValidatorItem';
import { IValidator } from '@/hooks/queries/useGetValidators';

type Props = {
  validators: IValidator[];
  isLoading?: boolean;
  onSelect?: (validator: IValidator) => void;
  selectedAddress?: string;
};

const ListValidators = ({
  validators,
  isLoading,
  onSelect,
  selectedAddress,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const parentRef = useRef(null!);

  if (isLoading) {
    return (
      <Center h="sm">
        <Spinner />
      </Center>
    );
  }

  const rowRenderer = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const validator = validators[index];
    return (
      <ValidatorItem
        style={style}
        key={`${index}-${validator.validatorPublicKey}}`}
        {...validator}
        showPriority
        pl={'2'}
        pr={'6'}
        color={
          selectedAddress === validator.validatorPublicKey ? 'light' : 'none'
        }
        cursor={'pointer'}
        _hover={{
          color: 'light',
        }}
        onClick={() => {
          onSelect?.(validator);
        }}
      />
    );
  };

  return (
    <Box
      mt="4"
      minH="sm"
      overflowX={'auto'}
      gap="5"
      alignItems={'center'}
      ref={parentRef}
    >
      <AutoSizer>
        {({ height, width }: { width: number; height: number }) => (
          <List
            width={width} // Width of the list
            height={height}
            itemCount={validators.length}
            itemSize={60}
          >
            {rowRenderer}
          </List>
        )}
      </AutoSizer>
    </Box>
  );
};

export default ListValidators;
