import { useDisclosure } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';

import ModalSelectToken from '../ModalSelectToken';
import SelectToken from '../SelectToken';
import { Token } from '@/services/friendlyMarket/tokens';

const SelectSwapTo = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { control, setValue } = useFormContext();
  const valueWatched = useWatch({
    control,
    name: 'swapTo',
  });

  const handleOnClick = () => {
    onOpen();
  };

  const handleOnSelect = (token: Token) => {
    setValue('swapTo', token);
    onClose();
  };

  return (
    <>
      <SelectToken onClick={handleOnClick} value={valueWatched} />
      <ModalSelectToken
        isOpen={isOpen}
        onClose={onClose}
        onSelect={handleOnSelect}
      />
    </>
  );
};

export default SelectSwapTo;
