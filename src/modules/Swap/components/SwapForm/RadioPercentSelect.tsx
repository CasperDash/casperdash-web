import Big from 'big.js';

import RadioButton from '@/components/Inputs/RadioButton';
import RadioButtonGroup from '@/components/Inputs/RadioButton/RadioButtonGroup';
import { useGetBalanceSelectedToken } from '@/modules/Swap/hooks/useGetBalanceSelectedToken';
import { useSetValueSwapFrom } from '@/modules/Swap/hooks/useSetValueSwapFrom';

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
  const { data } = useGetBalanceSelectedToken('swapFrom');
  const setValueSwapFrom = useSetValueSwapFrom();

  const handleSetAmount = (value: string) => {
    const amount = Big(value)
      .mul(data?.balance || 0)
      .div(100)
      .toNumber();
    setValueSwapFrom(amount);
  };

  return (
    <RadioButtonGroup
      name="wordsLength"
      alignItems="center"
      variant={'full-width'}
      defaultValue={'0'}
      onChange={handleSetAmount}
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
