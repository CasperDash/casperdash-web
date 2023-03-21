import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';

const styles = {
  global: {
    'html, body': {
      fontSize: '14px',
    },
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
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'gray.500',
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
