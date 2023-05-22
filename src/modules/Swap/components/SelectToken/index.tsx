import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';

import Balance from './Balance';
import Price from './Price';
import CircleWrapper from '@/components/Surface/CircleWrapper';
import { ArrowDownIcon } from '@/icons';
import { Token } from '@/services/friendlyMarket/tokens';

type SelectTokenProps = {
  onClick?: () => void;
  onChangeAmount?: (amount: string) => void;
  value?: Token;
};

const SelectToken = ({ value, onClick, onChangeAmount }: SelectTokenProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      px="4"
      py="1"
      h="21"
      border="1px solid"
      borderColor="gray.200"
      borderRadius={'xl'}
      direction={'column'}
    >
      <Flex
        justifyContent={'space-between'}
        alignItems="center"
        w="100%"
        gap="2"
      >
        <Flex
          flexBasis={1}
          alignItems="center"
          _hover={{ color: 'light', cursor: 'pointer' }}
          onClick={onClick}
        >
          {_.isEmpty(value) || !value.contractHash ? (
            <Text minW="24">{t('select_token')}</Text>
          ) : (
            <>
              <CircleWrapper p="6px">
                <Image src={value.logoURI} width="16px" height="16px" />
              </CircleWrapper>
              <Text ml="3">{value.symbol}</Text>
            </>
          )}
          <Box ml="3.5">
            <ArrowDownIcon />
          </Box>
        </Flex>
        <Flex flexBasis={0} flexGrow={'9999'} w="100%">
          <Input
            textAlign={'right'}
            variant="unstyled"
            border={'none'}
            placeholder="0.0"
            onChange={(e) => {
              onChangeAmount?.(e.target.value);
            }}
            value={value?.amount}
          />
        </Flex>
      </Flex>
      <Flex>
        <Balance value={value} />
        <Price value={value} />
      </Flex>
    </Flex>
  );
};

export default SelectToken;
