import React from 'react';

import { Box, Flex, FlexProps, Image, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import PriorityImage from '@/assets/img/red-casper.png';
import MiddleTruncatedText from '@/components/Common/MiddleTruncatedText';
import { IValidator } from '@/hooks/queries/useGetValidators';
import { toCSPR } from '@/utils/currency';

type Props = IValidator & { showPriority?: boolean } & FlexProps;

const ValidatorItem = ({
  priority,
  validatorPublicKey,
  logo,
  name,
  delegationRate,
  weight,
  showPriority,
  ...restProps
}: Props) => {
  const { t } = useTranslation();

  return (
    <Flex w={'100%'} justifyContent={'space-between'} {...restProps}>
      <Flex gap={2} alignItems={'center'}>
        {priority && showPriority && (
          <Image
            src={PriorityImage}
            width={{ base: 6 }}
            objectFit={'contain'}
          />
        )}
        {!priority && showPriority && (
          // Display empty box to align the option
          <Box width={{ base: 6 }} />
        )}
        <Image src={logo} width={{ base: 8 }} objectFit={'contain'} />
        <Flex direction={'column'} justifyContent={'space-between'}>
          <MiddleTruncatedText
            value={name || validatorPublicKey}
            textProps={{ fontWeight: 'medium' }}
            startLength={8}
            endLength={6}
          />
          <MiddleTruncatedText
            textProps={{ fontSize: 'sm', color: 'gray.500' }}
            value={validatorPublicKey}
            startLength={8}
            endLength={6}
          />
        </Flex>
      </Flex>
      <Flex direction={'column'} alignItems={'flex-end'}>
        <Text>{delegationRate}% Fee</Text>
        <Text>
          {t('intlAssetNumber', {
            asset: '',
            val: toCSPR(weight),
          })}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ValidatorItem;
