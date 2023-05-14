import { Flex, Image, Text } from '@chakra-ui/react';

import CircleWrapper from '@/components/Surface/CircleWrapper';

type TokenItemProps = {
  name: string;
  imageUrl: string;
  onClick?: () => void;
};

const TokenItem = ({ name, imageUrl, onClick }: TokenItemProps) => {
  return (
    <Flex
      cursor="pointer"
      _hover={{ color: 'light' }}
      alignItems={'center'}
      justify="space-between"
      w="100%"
      onClick={onClick}
    >
      <Flex alignItems={'center'}>
        <CircleWrapper p="6px">
          <Image src={imageUrl} width="16px" height="16px" />
        </CircleWrapper>
        <Text ml="3">{name}</Text>
      </Flex>
      <Text mr="4">0</Text>
    </Flex>
  );
};

export default TokenItem;
