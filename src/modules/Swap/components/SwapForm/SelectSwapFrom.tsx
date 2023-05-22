import { useDisclosure } from '@chakra-ui/react';
import Big from 'big.js';
import { useFormContext, useWatch } from 'react-hook-form';

import ModalSelectToken from '../ModalSelectToken';
import SelectToken from '../SelectToken';
import { useSetValueSwapFrom } from '@/modules/Swap/hooks/useSetValueSwapFrom';
import { Token } from '@/services/friendlyMarket/tokens';

const SelectSwapFrom = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { control, setValue } = useFormContext();
  const valueWatched = useWatch({
    control,
    name: 'swapFrom',
  });
  const setValueSwapFrom = useSetValueSwapFrom();

  const handleOnClick = () => {
    onOpen();
  };

  const handleOnSelect = (token: Token) => {
    setValue('swapFrom', {
      ...token,
      amount: 0,
    });
    setValueSwapFrom(0);

    onClose();
  };

  const handleOnChangeAmount = (amount: string) => {
    const value = Big(amount || 0)
      .round(valueWatched.decimals)
      .toNumber();
    setValueSwapFrom(value);
  };

  return (
    <>
      <SelectToken
        value={valueWatched}
        onClick={handleOnClick}
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

export default SelectSwapFrom;
