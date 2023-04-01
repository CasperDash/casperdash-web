import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { EncryptionType, KeyFactory } from 'casper-storage';
import * as _ from 'lodash-es';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ListWords from '@/components/Common/ListWords';
import RadioButton from '@/components/Inputs/RadioButton';
import RadioButtonGroup from '@/components/Inputs/RadioButton/RadioButtonGroup';
import SelectEncryptionType from '@/components/Select/SelectEncryptionType';
import { PathEnum } from '@/enums';
import { useAppDispatch } from '@/store';
import { updateEncryptionTypeAndMasterKey } from '@/store/wallet';

type Props = BoxProps;

const NUMBER_WORDS_PER_PAGE = 4;

type SubmitValues = {
  encryptionType: EncryptionType;
  wordsLength: number | string;
  masterKey: string;
};

const RecoveryKeys = ({ ...restProps }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit, control, register, setValue } = useForm<SubmitValues>({
    defaultValues: {
      encryptionType: EncryptionType.Ed25519,
      wordsLength: 12,
      masterKey: KeyFactory.getInstance().generate(12),
    },
  });
  const currentMasterKeyWatched = useWatch({
    name: 'masterKey',
    control,
  });

  const handleOnSubmit = ({ masterKey, encryptionType }: SubmitValues) => {
    console.log(masterKey);
    dispatch(
      updateEncryptionTypeAndMasterKey({
        encryptionType,
        masterKey,
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
        <Flex mt="6">
          <FormLabel></FormLabel>
          <Controller
            control={control}
            name="wordsLength"
            render={({ field: { onChange } }) => (
              <RadioButtonGroup
                name="wordsLength"
                alignItems="center"
                variant={'primary'}
                size="md"
                defaultValue={'12'}
                onChange={(value: string) => {
                  const masterKey = KeyFactory.getInstance().generate(
                    parseInt(value, 10)
                  );
                  setValue('masterKey', masterKey);

                  onChange(value);
                }}
              >
                <RadioButton value="12">{12}</RadioButton>
                <RadioButton value="24">{24}</RadioButton>
              </RadioButtonGroup>
            )}
          />
        </Flex>
        <Flex mt="9" gap="3" wrap={'wrap'} justifyContent="center">
          {_.chunk(
            currentMasterKeyWatched.split(' '),
            NUMBER_WORDS_PER_PAGE
          ).map((partWords: string[], index: number) => {
            return (
              <ListWords
                start={index * NUMBER_WORDS_PER_PAGE + 1}
                w="175px"
                key={`words-${index}`}
                words={partWords}
              />
            );
          })}
        </Flex>
        <Input type="hidden" {...register('masterKey')} />
        <Box mt="20">
          <Button type="submit" w="100%" variant="primary">
            {t('next')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RecoveryKeys;