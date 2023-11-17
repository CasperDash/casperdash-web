import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.700')(props),
      transitionProperty: 'background-color',
      transitionDuration: 'normal',
      lineHeight: 'base',
      fontWeight: 400,
      scrollbarGutter: 'stable',
    },
    a: {
      // color: props.colorMode === 'dark' ? 'teal.300' : 'gray.500',
    },
    html: {
      fontSize: '14px',
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word',
    },
    '@keyframes l': {
      to: {
        'clip-path': 'inset(0 -1ch 0 0)',
      },
    },
  }),
};
export default styles;
