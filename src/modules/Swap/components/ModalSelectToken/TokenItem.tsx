import { Flex, Image, Text } from '@chakra-ui/react';

import CircleWrapper from '@/components/Surface/CircleWrapper';
import { Token } from '@/services/friendlyMarket/tokens';

type TokenItemProps = {
  token: Token;
  onClick?: () => void;
};

const TokenItem = ({ token, onClick }: TokenItemProps) => {
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
          <Image src={token.logoURI} width="16px" height="16px" />
        </CircleWrapper>
        <Text ml="3">{token.name}</Text>
      </Flex>
      <Text mr="4">{token.balance || 0}</Text>
    </Flex>
  );
};

export default TokenItem;
