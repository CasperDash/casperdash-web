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

const RadioPercentSlippage = () => {
  return (
    <RadioButtonGroup
      name="wordsLength"
      alignItems="center"
      variant={'setting'}
      size="md"
      defaultValue={'12'}
      justifyContent={'start'}
      // onChange={(value: string) => {
      //   const masterKey = KeyFactory.getInstance().generate(
      //     parseInt(value, 10)
      //   );
      //   setValue('masterKey', masterKey);

      //   onChange(parseInt(value));
      // }}
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
