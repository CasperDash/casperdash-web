import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  Text,
  ListItem,
  OrderedList,
  Input,
} from '@chakra-ui/react';
import { EncryptionType } from 'casper-storage';
import * as _ from 'lodash-es';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Paper from '@/components/Paper';
import SelectEncryptionType from '@/components/Select/SelectEncryptionType';
import { PathEnum } from '@/enums';
import { useAppDispatch } from '@/store';
import { updateEncryptionType, updateMasterKey } from '@/store/wallet';

type Props = BoxProps;

type SubmitValues = {
  encryptionType: EncryptionType;
  words: string[];
};

const SeedPhrases = ({ ...restProps }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit, control, register, setValue } = useForm<SubmitValues>({
    defaultValues: {
      encryptionType: EncryptionType.Ed25519,
      words: [],
    },
  });
  const numberOfWords = 12;

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
        <Flex mt="9" gap="3" wrap={'wrap'} justifyContent="center">
          {_.chunk(_.range(1, 13), 4).map(
            (partWords: number[], index: number) => {
              const startIndex = index * 4 + 1;
              return (
                <Paper key={`words-${index}`} borderRadius="2xl" w="170px">
                  <OrderedList start={startIndex}>
                    {partWords.map((word: number, wordIndex: number) => {
                      const currentIndex = startIndex + wordIndex;
                      return (
                        <ListItem key={word} mt="3">
                          <Input
                            {...register(`words.${currentIndex}` as never, {
                              required: true,
                            })}
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
        <Box mt="20">
          <Button type="submit" w="100%" variant="primary">
            {t('next')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SeedPhrases;
