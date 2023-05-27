import { Flex, FormLabel } from '@chakra-ui/react';
import { KeyFactory } from 'casper-storage';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';

import RadioButton from '@/components/Inputs/RadioButton';
import RadioButtonGroup from '@/components/Inputs/RadioButton/RadioButtonGroup';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
};

export const RadioLengthWords = ({ control, setValue }: Props) => {
  return (
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

              onChange(parseInt(value));
            }}
          >
            <RadioButton value="12">{12}</RadioButton>
            <RadioButton value="24">{24}</RadioButton>
          </RadioButtonGroup>
        )}
      />
    </Flex>
  );
};
