import { BoxProps, ListItem, OrderedList } from '@chakra-ui/react';

import Paper from '@/components/Paper';

type Props = {
  words: string[];
  start?: number;
} & BoxProps;

const ListWords = ({ start, words, ...restProps }: Props) => {
  return (
    <Paper {...restProps} borderRadius="2xl">
      <OrderedList start={start}>
        {words.map((word: string) => (
          <ListItem key={word}>{word}</ListItem>
        ))}
      </OrderedList>
    </Paper>
  );
};

export default ListWords;
