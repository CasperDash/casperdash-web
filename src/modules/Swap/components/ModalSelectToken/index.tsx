import { Input, Flex, Text } from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';

import TokenItem from './TokenItem';
import Modal from '@/components/Modal';
import { useGetListSwapTokens } from '@/hooks/queries/useGetListSwapTokens';
import { useFuse } from '@/hooks/useFuse';
import { SearchIcon } from '@/icons';
import { Token } from '@/services/friendlyMarket/tokens';

type ModalReceivingAddressProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (token: Token) => void;
};

const ModalSelectToken = ({
  isOpen,
  onClose,
  onSelect,
}: ModalReceivingAddressProps) => {
  const { t } = useTranslation();
  const { data: listTokens = [] } = useGetListSwapTokens();

  const { hits, query, onSearch } = useFuse(listTokens, {
    keys: ['name'],
    limit: 1000,
  });

  const tokens = query ? _.map(hits, 'item') : listTokens;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('search_token')}>
      <Flex
        h="14"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="2xl"
        alignItems={'center'}
      >
        <Flex ml="4">
          <SearchIcon />
        </Flex>
        <Input
          ml="3"
          variant="unstyled"
          border={'none'}
          placeholder={t('search_token') || ''}
          onChange={onSearch}
        />
      </Flex>
      <Text color={'gray.500'} mt="8">
        {t('token_list')}
      </Text>
      <Flex direction={'column'} mt="6" gap="4">
        {tokens?.map((token) => (
          <TokenItem
            key={`${token.type}-${token.contractHash}`}
            name={token.name}
            imageUrl={token.logoURI}
            onClick={() => onSelect?.(token)}
          />
        ))}
      </Flex>
    </Modal>
  );
};

export default ModalSelectToken;
