import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  Text,
} from '@chakra-ui/react';
import { EncryptionType } from 'casper-storage';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ListWords from '@/components/Common/ListWords';
import SelectEncryptionType from '@/components/Select/SelectEncryptionType';
import { PathEnum } from '@/enums';
import { useI18nToast } from '@/hooks/useI18nToast';
import { useAppDispatch } from '@/store';
import {
  encryptionTypeSelector,
  updateEncryptionTypeAndGenerateMasterKey,
  wordsSelector,
} from '@/store/wallet';

type Props = BoxProps;

const NUMBER_WORDS_PER_PAGER = 4;

const RecoveryKeys = ({ ...restProps }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toastError } = useI18nToast();
  const dispatch = useAppDispatch();
  const words = useSelector(wordsSelector);
  const encryptionType = useSelector(encryptionTypeSelector);

  const handleOnEncryptionTypeChange = (newValue?: EncryptionType) => {
    if (!newValue) {
      toastError('encryption_type_does_not_exist');
      return;
    }

    dispatch(updateEncryptionTypeAndGenerateMasterKey(newValue));
  };

  const handelOnClickNext = () => {
    navigate(`${PathEnum.DOUBLE_CHECK}`);
  };

  return (
    <Box {...restProps}>
      <FormControl>
        <Text fontWeight="bold" mb="4">
          {t('select_encryption_type')}
        </Text>
        <SelectEncryptionType
          value={encryptionType}
          onChange={handleOnEncryptionTypeChange}
        />
      </FormControl>
      <Flex mt="9" gap="3" wrap={'wrap'} justifyContent="center">
        {_.chunk(words, NUMBER_WORDS_PER_PAGER).map(
          (partWords: string[], index: number) => {
            return (
              <ListWords
                start={index * NUMBER_WORDS_PER_PAGER + 1}
                w="175px"
                key={`words-${index}`}
                words={partWords}
              />
            );
          }
        )}
      </Flex>
      <Box mt="20">
        <Button onClick={handelOnClickNext} w="100%" variant="primary">
          {t('next')}
        </Button>
      </Box>
    </Box>
  );
};

export default RecoveryKeys;
