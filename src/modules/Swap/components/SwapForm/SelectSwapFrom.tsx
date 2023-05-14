import { useDisclosure } from '@chakra-ui/react';

import SelectToken from './SelectToken';
import ModalSelectToken from '../ModalSelectToken';

const SelectSwapFrom = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOnClick = () => {
    onOpen();
  };

  return (
    <>
      <SelectToken onClick={handleOnClick} />
      <ModalSelectToken isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SelectSwapFrom;
