import RadioButton from '@/components/Inputs/RadioButton';
import RadioButtonGroup from '@/components/Inputs/RadioButton/RadioButtonGroup';

const PERCENTS = [
  {
    value: '0.1',
    label: '0.1%',
  },
  {
    value: '0.5',
    label: '0.5%',
  },
  {
    value: '1',
    label: '1%',
  },
];

type Props = {
  onChange?: (value: number) => void;
};

const RadioPercentSlippage = ({ onChange }: Props) => {
  return (
    <RadioButtonGroup
      name="wordsLength"
      alignItems="center"
      variant={'setting'}
      size="md"
      defaultValue={'12'}
      justifyContent={'start'}
      onChange={(value: string) => {
        onChange?.(parseFloat(value));
      }}
    >
      {PERCENTS.map((item) => {
        return (
          <RadioButton key={`percent-${item.value}`} value={item.value}>
            {item.label}
          </RadioButton>
        );
      })}
    </RadioButtonGroup>
  );
};

export default RadioPercentSlippage;
