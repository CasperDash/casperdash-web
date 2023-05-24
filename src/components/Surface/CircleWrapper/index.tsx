import { Box, BoxProps } from '@chakra-ui/react';

type CircleWrapperProps = {
  size?: number | string;
} & BoxProps;

const CircleWrapper = ({
  size = 8,
  children,
  ...restProps
}: CircleWrapperProps) => {
  return (
    <Box
      backgroundColor={'light'}
      w={size}
      h={size}
      borderRadius={'full'}
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default CircleWrapper;
