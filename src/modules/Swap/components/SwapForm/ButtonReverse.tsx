import { Flex } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';

import CircleWrapper from '@/components/Surface/CircleWrapper';
import { ReverseIcon } from '@/icons';

const ButtonReverse = () => {
  const { control, setValue } = useFormContext();
  const swapFrom = useWatch({
    control,
    name: 'swapFrom',
  });

  const swapTo = useWatch({
    control,
    name: 'swapTo',
  });
  const handleReverse = () => {
    setValue('swapFrom', swapTo);
    setValue('swapTo', swapFrom);
  };

  return (
    <Flex justifyContent={'center'} my="8">
      <CircleWrapper
        size={11}
        p="9.6px"
        cursor="pointer"
        onClick={handleReverse}
      >
        <ReverseIcon />
      </CircleWrapper>
    </Flex>
  );
};

export default ButtonReverse;
