import { useDisclosure } from '@chakra-ui/react';
import Big from 'big.js';
import { useFormContext, useWatch } from 'react-hook-form';

import ModalSelectToken from '../ModalSelectToken';
import SelectToken from '../SelectToken';
import useCalculateAmountIn from '@/modules/Swap/hooks/useCalculateAmountIn';
import { Token } from '@/services/friendlyMarket/tokens';

const SelectSwapTo = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { control, setValue } = useFormContext();
  const valueWatched = useWatch({
    control,
    name: 'swapTo',
  });
  const setValueAmountIn = useCalculateAmountIn();

  const handleOnClick = () => {
    onOpen();
  };

  const handleOnSelect = (token: Token) => {
    setValue('swapTo', {
      ...token,
      amount: 0,
    });
    setValueAmountIn(0);

    onClose();
  };

  const handleOnChangeAmount = (amount: string) => {
    const value = Big(amount || 0)
      .round(valueWatched.decimals || 0)
      .toNumber();
    setValue('swapTo.amount', value);
    setValueAmountIn(value);
  };

  return (
    <>
      <SelectToken
        onClick={handleOnClick}
        value={valueWatched}
        onChangeAmount={handleOnChangeAmount}
      />
      <ModalSelectToken
        isOpen={isOpen}
        onClose={onClose}
        onSelect={handleOnSelect}
      />
    </>
  );
};

export default SelectSwapTo;
