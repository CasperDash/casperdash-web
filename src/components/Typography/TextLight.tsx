import { ReactNode } from 'react';

import { Text } from '@chakra-ui/react';

type TextLightProps = {
  children: ReactNode;
};

const TextLight = ({ children }: TextLightProps) => {
  return <Text color="gray.500">{children}</Text>;
};

export default TextLight;
