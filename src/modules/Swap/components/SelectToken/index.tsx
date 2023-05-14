import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';

import CircleWrapper from '@/components/Surface/CircleWrapper';
import { ArrowDownIcon } from '@/icons';
import { Token } from '@/services/friendlyMarket/tokens';

type SelectTokenProps = {
  onClick?: () => void;
  value?: Token;
};

const SelectToken = ({ value, onClick }: SelectTokenProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      p="4"
      h="18"
      border="1px solid"
      borderColor="gray.200"
      borderRadius={'xl'}
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
          {!_.isEmpty(value) ? (
            <>
              <CircleWrapper p="6px">
                <Image src={value.logoURI} width="16px" height="16px" />
              </CircleWrapper>
              <Text ml="3">{value.symbol}</Text>
            </>
          ) : (
            <Text ml="3" minW="24">
              {t('select_token')}
            </Text>
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
          />
        </Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default SelectToken;
