import { ReactNode, useState } from 'react';

import { AbsoluteCenter, Box, Text } from '@chakra-ui/react';

type BlurredBoxProps = {
  children: ReactNode;
};

const BLURRED_STYLES = {
  filter: 'blur(5px)',
};

const BlurredBox = ({ children }: BlurredBoxProps) => {
  const [isBlurred, setIsBlurred] = useState(true);

  const extra = isBlurred ? BLURRED_STYLES : {};

  const handleOnClick = () => {
    if (isBlurred) {
      setIsBlurred(false);
    }
  };

  return (
    <Box
      position="relative"
      cursor={isBlurred ? 'pointer' : 'inherit'}
      onClick={handleOnClick}
    >
      <Box {...extra}>{children}</Box>
      {isBlurred && (
        <AbsoluteCenter p="4" axis="both">
          <Text>Click to reveal</Text>
        </AbsoluteCenter>
      )}
    </Box>
  );
};

export default BlurredBox;
