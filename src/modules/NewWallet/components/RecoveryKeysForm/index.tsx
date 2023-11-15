import { useRef } from 'react';

import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
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
  masterKeyEntropy: Uint8Array;
};

const RecoveryKeysForm = ({ ...restProps }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const masterKeyEntropyWatchedRef = useRef<Uint8Array>(null!);
  const { handleSubmit, control, setValue } = useForm<SubmitValues>({
    defaultValues: {
      encryptionType: EncryptionType.Ed25519,
      wordsLength: 12,
      masterKeyEntropy: KeyFactory.getInstance().generate(12),
    },
  });
  masterKeyEntropyWatchedRef.current = useWatch({
    name: 'masterKeyEntropy',
    control,
  });
  const numberOfWords = useWatch({
    control,
    name: 'wordsLength',
  });

  const handleOnSubmit = ({
    masterKeyEntropy,
    encryptionType,
  }: SubmitValues) => {
    dispatch(
      updateEncryptionTypeAndMasterKey({
        encryptionType,
        masterKeyEntropy,
      })
    );

    navigate(`${PathEnum.DOUBLE_CHECK}`);
  };

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
          {_.chunk(Array.from(Array(numberOfWords).keys()), 4).map(
            (partWordIndexes: number[], index: number) => {
              return (
                <ListWords
                  start={index * NUMBER_WORDS_PER_PAGE + 1}
                  w={{ base: '80px', md: '175px' }}
                  key={`words-${index}`}
                  wordIndexes={partWordIndexes}
                  masterKeyEntropy={masterKeyEntropyWatchedRef.current}
                  border={{ base: 'none', md: '1px solid' }}
                  borderColor={{ base: 'none', md: 'gray.200' }}
                  p={{ base: '0', md: '8' }}
                />
              );
            }
          )}
        </Flex>
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
