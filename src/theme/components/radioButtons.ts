import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

import fontSizes from '../foundations/fontSizes';

const helpers = createMultiStyleConfigHelpers(['radioButtons', 'item']);

const RadioButtons = helpers.defineMultiStyleConfig({
  baseStyle: {
    radioButtons: {
      display: 'flex',
    },
    item: {
      cursor: 'pointer',
      borderWidth: '1px',
      borderRadius: '3xl',
      boxShadow: 'md',
      textAlign: 'center',
      _checked: {
        bg: 'blue.300',
        color: 'white',
        borderColor: 'blue.300',
      },
      _focus: {
        boxShadow: 'outline',
      },
      px: 5,
      py: 3,
      fontWeight: 'medium',
      lineHeight: 'normal',
      color: 'gray.600',
    },
  },
  sizes: {
    xs: {
      item: {
        fontSize: fontSizes.xs,
      },
    },
    sm: {
      item: {
        fontSize: fontSizes.sm,
        w: '103px',
      },
    },
  },
  variants: {
    primary: {
      item: {
        _checked: {
          bg: 'primary',
          borderColor: 'primary',
        },
      },
    },
    bold: {
      item: {
        fontWeight: 'bold',
      },
      radioButtons: {},
    },
    colorful: {
      item: {
        color: 'orange.600',
      },
      radioButtons: {
        bg: 'orange.100',
      },
    },
  },
  defaultProps: {
    size: 'sm',
  },
});

export default RadioButtons;
