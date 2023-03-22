import { Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Paper from '../../Paper';

export type TotalBalanceProps = {
  marketCapValue: number;
  dayVolumeValue: number;
} & BoxProps;
const TotalBalance = ({
  marketCapValue,
  dayVolumeValue,
  ...restProps
}: TotalBalanceProps) => {
  const { t } = useTranslation();

  return (
    <Paper {...restProps} p="0" py="8">
      <Flex direction="column">
        <Flex
          borderBottom="1px solid"
          borderColor="gray.200"
          pb="8"
          flex="1"
          pl="7"
          direction="column"
        >
          <Box>
            <Text>{t('total_balance')}</Text>
          </Box>
          <Box mt="3">
            <Heading variant="2xl">1.00069787 CSPR</Heading>
          </Box>
          <Box mt="3">
            <Text color="gray.500" lineHeight="6" fontSize="sm">
              $10,098.36
            </Text>
          </Box>
        </Flex>
        <Flex pos="relative" flex="1">
          <Box flex="1" pl="7" pt="8">
            <Text>{t('total_volume')}</Text>
            <Box mt="3">
              <Heading variant="xl">
                {t('intlNumber', {
                  val: marketCapValue,
                })}
              </Heading>
            </Box>
          </Box>
          <Box
            pos="absolute"
            left="50%"
            height="142px"
            borderLeft="1px solid"
            borderColor="gray.200"
          ></Box>
          <Box flex="1" pl="7" pt="8">
            <Text>{t('24h_volume')}</Text>
            <Box mt="3">
              <Heading variant="xl">
                {t('intlNumber', {
                  val: dayVolumeValue,
                })}
              </Heading>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default TotalBalance;
