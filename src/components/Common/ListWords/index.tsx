import { BoxProps, ListItem, OrderedList } from '@chakra-ui/react';

import Paper from '@/components/Paper';
import { getWord } from '@/utils/entropy';

type Props = {
  wordIndexes: number[];
  start?: number;
  masterKeyEntropy: Uint8Array;
} & BoxProps;

const ListWords = ({
  start,
  wordIndexes,
  masterKeyEntropy,
  ...restProps
}: Props) => {
  return (
    <Paper {...restProps} borderRadius="2xl">
      <OrderedList start={start}>
        {wordIndexes.map((wordIndex: number) => (
          <ListItem key={`word-${wordIndex}`} lineHeight="6">
            {getWord(masterKeyEntropy, wordIndex, true)}
          </ListItem>
        ))}
      </OrderedList>
    </Paper>
  );
};

export default ListWords;
