import { Box, BoxProps } from '@chakra-ui/react';

export type PaperProps = BoxProps & {
  children: React.ReactNode;
};

const Paper = ({ children, ...restProps }: PaperProps) => {
  return (
    <Box
      p="8"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="5xl"
      backgroundColor="white"
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default Paper;
