import { BoxProps, Flex } from '@chakra-ui/react';
import * as _ from 'lodash-es';

import ListWords from '@/components/Common/ListWords';

type Props = {
  keyPhrases: string[];
  numberWordsPerPage: number;
} & BoxProps;

const ListKeyPhrases = ({
  keyPhrases = [],
  numberWordsPerPage = 4,
  ...restProps
}: Props) => {
  return (
    <Flex
      mt="9"
      flexWrap={'wrap'}
      gap={{ base: '0', md: '3' }}
      justifyContent="center"
      alignItems="center"
      border={{ base: '1px solid', md: 'none' }}
      borderColor={{ base: 'gray.200', md: 'none' }}
      borderRadius={{ base: '2xl', md: 'none' }}
      p={{ base: '3', md: '0' }}
      flexDirection={{ base: 'column', md: 'row' }}
      maxHeight={{
        base: keyPhrases.length === 12 ? '100px' : '230px',
        md: 'auto',
      }}
      {...restProps}
    >
      {_.chunk(keyPhrases, numberWordsPerPage).map(
        (partWords: string[], index: number) => {
          return (
            <ListWords
              start={index * numberWordsPerPage + 1}
              w={{ base: '80px', md: '100%' }}
              key={`words-${index}`}
              words={partWords}
              border={{ base: 'none', md: '1px solid' }}
              borderColor={{ base: 'none', md: 'gray.200' }}
              p={{ base: '0', md: '8' }}
            />
          );
        }
      )}
    </Flex>
  );
};

export default ListKeyPhrases;
