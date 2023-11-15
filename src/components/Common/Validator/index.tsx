import { Flex, FlexProps, Image, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import MiddleTruncatedText from '../MiddleTruncatedText';

type ValidatorProps = {
  name?: string;
  publicKey: string;
  logo?: string;
} & FlexProps;

const Validator = ({ name, publicKey, logo, ...rest }: ValidatorProps) => {
  const { t } = useTranslation();

  return (
    <Flex alignItems={'center'} {...rest}>
      <Image
        src={logo}
        width="30px"
        height="30px"
        ml="1px"
        borderRadius={'full'}
      />
      <Flex
        ml="3"
        direction={'column'}
        justifyContent={'space-between'}
        minH="12"
      >
        <Text fontWeight={'medium'}>{name || t('unknown')}</Text>
        <MiddleTruncatedText
          value={publicKey}
          textProps={{ color: 'gray.500', fontSize: 'sm' }}
        />
      </Flex>
    </Flex>
  );
};

export default Validator;
