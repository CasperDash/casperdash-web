import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  Text,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';
import { EncryptionType } from 'casper-storage';
import * as _ from 'lodash-es';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import SecretInput from '@/components/Inputs/SecretInput';
import Paper from '@/components/Paper';
import SelectEncryptionType from '@/components/Select/SelectEncryptionType';
import { PathEnum } from '@/enums';
import { RadioLengthWords } from '@/modules/core/Controllers/RadioLengthWords';
import { useAppDispatch } from '@/store';
import { updateEncryptionType, updateMasterKey } from '@/store/wallet';

type Props = BoxProps;

type SubmitValues = {
  encryptionType: EncryptionType;
  words: string[];
  wordsLength: number;
};

const SeedPhrases = ({ ...restProps }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit, control, register, setValue } = useForm<SubmitValues>({
    defaultValues: {
      encryptionType: EncryptionType.Ed25519,
      words: [],
      wordsLength: 12,
    },
  });
  const numberOfWords = useWatch({
    control,
    name: 'wordsLength',
  });

  const pasteEventHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pasteData = event.clipboardData.getData('text');
    const words: string[] = pasteData.split(' ');
    if (numberOfWords - words.length <= 0) {
      const newWords: string[] = words.slice(0, numberOfWords);
      setValue('words', ['', ...newWords]);

      return;
    }

    const filledWords: string[] = words.concat(
      new Array(numberOfWords - words.length).fill('')
    );
    setValue('words', ['', ...filledWords]);
  };

  const handelOnSubmit = (values: SubmitValues) => {
    const { encryptionType, words } = values;
    const masterKey = words.filter((word: string) => word).join(' ');

    dispatch(updateEncryptionType(encryptionType));
    dispatch(updateMasterKey(masterKey));
    navigate(`${PathEnum.IMPORT_WALLET_NEW_PASSWORD}`);
  };

  return (
    <Box {...restProps}>
      <form onSubmit={handleSubmit(handelOnSubmit)}>
        <FormControl>
          <Text fontWeight="bold" mb="4">
            {t('select_encryption_type')}
          </Text>
          <Controller
            control={control}
            name="encryptionType"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SelectEncryptionType value={value} onChange={onChange} />
            )}
          />
        </FormControl>
        <RadioLengthWords control={control} setValue={setValue} />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          maxH={{ base: numberOfWords === 24 ? '600px' : '300px', md: 'none' }}
          mt="9"
          gap="3"
          wrap={'wrap'}
          justifyContent="center"
        >
          {_.chunk(_.range(1, numberOfWords + 1), 4).map(
            (partWords: number[], index: number) => {
              const startIndex = index * 4 + 1;
              return (
                <Paper
                  key={`words-${index}`}
                  borderRadius="2xl"
                  w={{ base: '96px', md: '160px' }}
                  px={{ base: 2, md: 8 }}
                  py={{ base: 0, md: 8 }}
                  border={{ base: 'none', md: '1px solid' }}
                  borderColor={{ base: 'none', md: 'gray.200' }}
                >
                  <OrderedList start={startIndex} mb="-3">
                    {partWords.map((word: number, wordIndex: number) => {
                      const currentIndex = startIndex + wordIndex;
                      return (
                        <ListItem key={word} mt="3">
                          <SecretInput
                            {...register(`words.${currentIndex}`, {
                              required: true,
                            })}
                            type="password"
                            onPaste={pasteEventHandler}
                          />
                        </ListItem>
                      );
                    })}
                  </OrderedList>
                </Paper>
              );
            }
          )}
        </Flex>
        <Box mt={{ base: 17, md: 20 }}>
          <Button type="submit" w="100%" variant="primary">
            {t('next')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SeedPhrases;
