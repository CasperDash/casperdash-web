import * as _ from 'lodash-es';
import { Control, Controller, FieldValues } from 'react-hook-form';

import RadioButton from '@/components/Inputs/RadioButton';
import RadioButtonGroup from '@/components/Inputs/RadioButton/RadioButtonGroup';
import { getPhraseLength, getWord } from '@/utils/entropy';

type Props = {
  control: Control<FieldValues>;
  answerIndex: number;
  masterKeyEntropy: Uint8Array;
  options: number[];
};

const WordsCheckerController = ({
  control,
  answerIndex,
  masterKeyEntropy,
  options,
}: Props) => {
  return (
    <Controller
      control={control}
      name={`words.${answerIndex}`}
      rules={{
        required: true,
        validate: {
          isValid: (value: string) => {
            if (value !== getWord(masterKeyEntropy, answerIndex, true)) {
              return 'error';
            }
          },
        },
      }}
      render={({ field: { onChange } }) => (
        <RadioButtonGroup alignItems="center" onChange={onChange}>
          {_.pullAt(
            [...Array.from(Array(getPhraseLength(masterKeyEntropy)).keys())],
            options
          ).map((value: number) => {
            return (
              <RadioButton
                key={`word-checker-${value}`}
                value={getWord(masterKeyEntropy, value, true)}
              >
                {getWord(masterKeyEntropy, value, true)}
              </RadioButton>
            );
          })}
        </RadioButtonGroup>
      )}
    />
  );
};

export default WordsCheckerController;
