import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';

const styles = {
  global: {
    'html, body': {},
  },
  colors: {
    gray: {
      700: '#1f2733',
    },
  },
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.700')(props),
        fontFamily: 'Helvetica, sans-serif',
        transitionProperty: 'background-color',
        transitionDuration: 'normal',
        lineHeight: 'base',
      },
      html: {
        fontFamily: 'Helvetica, sans-serif',
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
    }),
  },
};

export default styles;
