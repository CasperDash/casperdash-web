import RadioButton from '@/components/Inputs/RadioButton';
import RadioButtonGroup from '@/components/Inputs/RadioButton/RadioButtonGroup';

const PERCENTS = [
  {
    value: '25',
    label: '25%',
  },
  {
    value: '50',
    label: '50%',
  },
  {
    value: '75',
    label: '75%',
  },
  {
    value: '100',
    label: '100%',
  },
];

const RadioPercentSelect = () => {
  return (
    <RadioButtonGroup
      name="wordsLength"
      alignItems="center"
      variant={'primary'}
      size="md"
      defaultValue={'12'}
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

export default RadioPercentSelect;
