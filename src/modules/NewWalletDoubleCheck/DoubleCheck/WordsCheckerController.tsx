import * as _ from 'lodash-es';
import { Control, Controller, FieldValues } from 'react-hook-form';

import RadioButtons from '@/components/Inputs/RadioButton';

type Props = {
  control: Control<FieldValues>;
  answer: number;
  words: string[];
  options: number[];
};

const WordsCheckerController = ({ control, answer, words, options }: Props) => {
  return (
    <Controller
      control={control}
      name={`words.${answer}`}
      rules={{
        required: true,
        validate: {
          isValid: (value: string) => {
            if (value !== words[answer]) {
              return 'error';
            }
          },
        },
      }}
      render={({ field: { onChange } }) => (
        <RadioButtons
          alignItems="center"
          options={_.pullAt([...words], options)}
          onChange={onChange}
        />
      )}
    />
  );
};

export default WordsCheckerController;
