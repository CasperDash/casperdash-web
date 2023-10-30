import { useEffect, useRef } from 'react';

import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
} from '@chakra-ui/react';
import { EncryptionType, KeyFactory } from 'casper-storage';
import * as _ from 'lodash-es';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ListWords from '@/components/Common/ListWords';
import SelectEncryptionType from '@/components/Select/SelectEncryptionType';
import { PathEnum } from '@/enums';
import { RadioLengthWords } from '@/modules/core/Controllers/RadioLengthWords';
import { useAppDispatch } from '@/store';
import { updateEncryptionTypeAndMasterKey } from '@/store/wallet';

type Props = BoxProps;

const NUMBER_WORDS_PER_PAGE = 4;

type SubmitValues = {
  encryptionType: EncryptionType;
  wordsLength: number | string;
  masterKey: string;
};

const RecoveryKeysForm = ({ ...restProps }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const masterKeyWatchedRef = useRef<string>('');
  const { handleSubmit, control, register, setValue, reset } =
    useForm<SubmitValues>({
      defaultValues: {
        encryptionType: EncryptionType.Ed25519,
        wordsLength: 12,
        masterKey: KeyFactory.getInstance().generate(12),
      },
    });
  masterKeyWatchedRef.current = useWatch({
    name: 'masterKey',
    control,
  });
  const numberOfWords = useWatch({
    control,
    name: 'wordsLength',
  });

  const handleOnSubmit = ({ masterKey, encryptionType }: SubmitValues) => {
    dispatch(
      updateEncryptionTypeAndMasterKey({
        encryptionType,
        masterKey,
      })
    );

    navigate(`${PathEnum.DOUBLE_CHECK}`);
  };

  useEffect(() => {
    return () => {
      masterKeyWatchedRef.current = '';
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box {...restProps}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
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
              <SelectEncryptionType
                value={value}
                onChange={(encryptionTypeValue: string) => {
                  onChange(encryptionTypeValue);
                }}
              />
            )}
          />
        </FormControl>
        <RadioLengthWords control={control} setValue={setValue} />
        <Flex
          mt="9"
          flexWrap={'wrap'}
          gap={{ base: '0', md: '3' }}
          justifyContent="center"
          alignItems="center"
          border={{ base: '1px solid', md: 'none' }}
          borderColor={{ base: 'gray.200', md: 'none' }}
          borderRadius={{ base: '2xl', md: 'none' }}
          p={{ base: '3', md: '0' }}
          flexDirection={{ base: 'column', md: 'row' }}
          maxHeight={{
            base: numberOfWords === 12 ? '100px' : '230px',
            md: 'auto',
          }}
        >
          {_.chunk(masterKeyWatchedRef.current.split(' '), 4).map(
            (partWords: string[], index: number) => {
              return (
                <ListWords
                  start={index * NUMBER_WORDS_PER_PAGE + 1}
                  w={{ base: '80px', md: '175px' }}
                  key={`words-${index}`}
                  words={partWords}
                  border={{ base: 'none', md: '1px solid' }}
                  borderColor={{ base: 'none', md: 'gray.200' }}
                  p={{ base: '0', md: '8' }}
                />
              );
            }
          )}
        </Flex>
        <Input type="hidden" {...register('masterKey')} />
        <Box mt={{ base: 18, md: 30 }}>
          <Button type="submit" w="100%" variant="primary">
            {t('next')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RecoveryKeysForm;
