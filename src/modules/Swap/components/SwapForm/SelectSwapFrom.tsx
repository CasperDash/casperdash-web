import { useDisclosure } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';

import ModalSelectToken from '../ModalSelectToken';
import SelectToken from '../SelectToken';
import { Token } from '@/services/friendlyMarket/tokens';

const SelectSwapFrom = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { control, setValue } = useFormContext();
  const valueWatched = useWatch({
    control,
    name: 'swapFrom',
  });

  const handleOnClick = () => {
    onOpen();
  };

  const handleOnSelect = (token: Token) => {
    setValue('swapFrom', token);
    onClose();
  };

  return (
    <>
      <SelectToken value={valueWatched} onClick={handleOnClick} />
      <ModalSelectToken
        isOpen={isOpen}
        onClose={onClose}
        onSelect={handleOnSelect}
      />
    </>
  );
};

export default SelectSwapFrom;
