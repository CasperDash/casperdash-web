import { Text, TextProps } from '@chakra-ui/react';

type Props = TextProps;

const TripleDotLoading = (props: Props) => {
  return (
    <Text
      display={'inline-block'}
      clipPath={'inset(0 2ch 0 0)'}
      fontWeight={'bold'}
      ml="1"
      animation={'l 1s steps(4) infinite'}
      fontSize={'sm'}
      {...props}
    >
      . . .
    </Text>
  );
};

export default TripleDotLoading;
