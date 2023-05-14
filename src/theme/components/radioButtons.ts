import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

import fontSizes from '../foundations/fontSizes';

const helpers = createMultiStyleConfigHelpers(['radioButtons', 'item']);

const RadioButtons = helpers.defineMultiStyleConfig({
  baseStyle: {
    radioButtons: {
      display: 'flex',
      gap: 4,
    },
    item: {
      cursor: 'pointer',
      fontWeight: 'medium',
      lineHeight: 'normal',
      textAlign: 'center',
      borderWidth: '1px',
      _focus: {
        boxShadow: 'outline',
      },
      _checked: {
        bg: 'blue.300',
        color: 'white',
        borderColor: 'blue.300',
      },
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
      radioButtons: {
        flexWrap: 'wrap',
        maxW: { base: 'xs', md: 'lg' },
        justifyContent: 'center',
      },
      item: {
        boxShadow: 'md',
        px: 5,
        py: 3,
        color: 'gray.600',
        borderRadius: '3xl',
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
    setting: {
      radioButtons: {
        gap: 2,
      },
      item: {
        height: 9,
        minW: 16,
        px: 2,
        py: 2,
        borderRadius: '30px',
        bg: 'blue.50',
      },
    },
    'full-width': {
      radioButtons: {
        w: '100%',
        gap: '2px',
      },
      item: {
        flex: '0 0 100%',
        bg: 'blue.50',
        py: 2,
        h: 8,
        fontSize: 'xs',
      },
    },
  },
  defaultProps: {
    size: 'sm',
  },
});

export default RadioButtons;
