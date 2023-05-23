import { Flex, Image, Text } from '@chakra-ui/react';

import CircleWrapper from '@/components/Surface/CircleWrapper';
import { useGetSwapTokenBalance } from '@/modules/Swap/hooks/useGetSwapTokenBalance';
import { Token } from '@/services/friendlyMarket/tokens';

type TokenItemProps = {
  token: Token;
  publicKey?: string;
  onClick?: () => void;
};

const TokenItem = ({ publicKey, token, onClick }: TokenItemProps) => {
  const { data: { balance } = { balance: 0 } } = useGetSwapTokenBalance({
    ...token,
    publicKey,
  });
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
      <Text mr="4">{balance || 0}</Text>
    </Flex>
  );
};

export default TokenItem;
