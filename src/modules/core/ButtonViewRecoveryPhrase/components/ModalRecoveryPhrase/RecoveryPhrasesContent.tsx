import { OrderedList, ListItem, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import BlurredBox from '@/components/Common/BlurredBox';
import { useGetMyRecoveryPhrase } from '@/hooks/queries/useGetMyRecoveryPhrase';
import { getPhraseLength, getWord } from '@/utils/entropy';

const RecoveryPhrasesContent = () => {
  const { t } = useTranslation();
  const { data: recoveryPhrase } = useGetMyRecoveryPhrase();
  const totalWords = getPhraseLength(recoveryPhrase);

  return (
    <>
      <BlurredBox>
        {recoveryPhrase && (
          <OrderedList
            display={'flex'}
            flexWrap="wrap"
            flexDirection={'column'}
            maxH={totalWords > 12 ? '180px' : '100px'}
            mt="10"
            ml="10"
          >
            {Array.from(Array(totalWords).keys()).map((wordIndex: number) => (
              <ListItem
                key={`word-${wordIndex}`}
                lineHeight="6"
                _before={{
                  color: 'red !important',
                }}
              >
                {getWord(recoveryPhrase, wordIndex, true)}
              </ListItem>
            ))}
          </OrderedList>
        )}
      </BlurredBox>
      <Flex mt="10">
        <Text fontSize={'sm'} textAlign={'center'}>
          {t('write_down_your_recovery_phrase')}
        </Text>
      </Flex>
    </>
  );
};

export default RecoveryPhrasesContent;
