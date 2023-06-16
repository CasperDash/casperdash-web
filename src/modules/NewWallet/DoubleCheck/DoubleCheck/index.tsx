import { useEffect, useMemo, useRef } from 'react';

import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import WordsCheckerController from './WordsCheckerController';
import { PathEnum } from '@/enums';
import { useI18nToast } from '@/hooks/helpers/useI18nToast';
import { wordsSelector } from '@/store/wallet';
import {
  generateSeedPhraseCheckers,
  SeedPhraseChecker,
} from '@/utils/seedPhrase';

type Props = BoxProps;

const TOTAL_DOUBLE_CHECK = 4;

const DoubleCheck = ({ ...restProps }: Props) => {
  const navigate = useNavigate();
  const { toastError } = useI18nToast();
  const { t } = useTranslation();
  const seedPhraseCheckersRef = useRef<SeedPhraseChecker[]>([]);
  const { handleSubmit, control, reset } = useForm();
  const words = useSelector(wordsSelector);

  seedPhraseCheckersRef.current = useMemo(() => {
    if (words.length === 0) {
      return [];
    }

    return generateSeedPhraseCheckers(words.length, TOTAL_DOUBLE_CHECK);
  }, [words]);

  const onSubmit = () => {
    navigate(PathEnum.NEW_PASSWORD);
  };

  const onSubmitError = () => {
    toastError('seed_phrase_is_not_correct');
  };

  useEffect(() => {
    return () => {
      seedPhraseCheckersRef.current = [];
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box {...restProps} maxW={{ base: 'xs', md: 'lg' }}>
      <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <Flex mt="9" gap="7" alignItems="center" direction="column">
          {seedPhraseCheckersRef.current.map(
            ({ answer, options }: SeedPhraseChecker) => {
              return (
                <FormControl key={`double-check-${answer}`}>
                  <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <FormLabel>
                      {t('select_word', { orderNumber: answer + 1 })}
                    </FormLabel>
                    <Box mt="6">
                      <WordsCheckerController
                        control={control}
                        words={words}
                        options={options}
                        answer={answer}
                      />
                    </Box>
                  </Flex>
                </FormControl>
              );
            }
          )}
        </Flex>
        <Flex mt="20" mb="10" justifyContent="center">
          <Button
            type="submit"
            w={{ base: '60%', md: '90%' }}
            variant="primary"
          >
            {t('next')}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default DoubleCheck;
