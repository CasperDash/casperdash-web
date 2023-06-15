import { OrderedList, ListItem, Flex, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { useSafeClipboard } from '@/hooks/helpers/useSafeClipboard';
import { useGetMyRecoveryPhrase } from '@/hooks/queries/useGetMyRecoveryPhrase';

const RecoveryPhrasesContent = () => {
  const { t } = useTranslation();
  const { data: recoveryPhrase = '' } = useGetMyRecoveryPhrase();
  const { toastSuccess } = useI18nToast();

  const { onCopy } = useSafeClipboard(recoveryPhrase);

  const recoveryPhraseList = recoveryPhrase?.split(' ');

  const handleOnCopy = () => {
    onCopy();
    toastSuccess('copy_recovery_phrases');
  };

  return (
    <>
      <OrderedList
        display={'flex'}
        flexWrap="wrap"
        flexDirection={'column'}
        maxH={recoveryPhraseList.length > 12 ? '180px' : '100px'}
        mt="10"
        ml="10"
      >
        {recoveryPhraseList.map((word: string) => (
          <ListItem
            key={word}
            lineHeight="6"
            _before={{
              color: 'red !important',
            }}
          >
            {word}
          </ListItem>
        ))}
      </OrderedList>
      <Flex justifyContent={'center'} mt="10">
        <Button variant={'primary'} onClick={handleOnCopy} w="5xs">
          {t('copy')}
        </Button>
      </Flex>
    </>
  );
};

export default RecoveryPhrasesContent;
