import * as _ from 'lodash-es';
import { Control, Controller, FieldValues } from 'react-hook-form';

import RadioButton from '@/components/Inputs/RadioButton';
import RadioButtonGroup from '@/components/Inputs/RadioButton/RadioButtonGroup';

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
        <RadioButtonGroup alignItems="center" onChange={onChange}>
          {_.pullAt([...words], options).map((value: string) => {
            return (
              <RadioButton key={`word-${value}`} value={value}>
                {value}
              </RadioButton>
            );
          })}
        </RadioButtonGroup>
      )}
    />
  );
};

export default WordsCheckerController;
