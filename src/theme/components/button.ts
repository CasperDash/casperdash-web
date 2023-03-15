import type { ComponentStyleConfig } from '@chakra-ui/theme';

import colors from '../foundations/colors';

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 600,
    fontSize: 18,

    bg: colors.primary,
    background: colors.primary,
    color: colors.black,

    w: '100%',
    minW: '100px',
    maxW: '360px',
    h: '50px',
    height: '50px',
    borderRadius: '90px',
    padding: '0 30px',

    _hover: {
      filter: 'brightness(0.8)',
      bg: colors.primary,
      background: colors.primary,
      color: colors.black,
    },

    _active: {
      filter: 'brightness(0.9)',
      bg: colors.primary,
      background: colors.primary,
      color: colors.black,
    },
  },

  variants: {
    primary: {},

    light: {
      bg: 'transparent',
      background: 'transparent',
      color: colors.black,
      border: `2px solid ${colors.gray[200]}`,
    },

    circle: {
      bg: 'transparent',
      background: 'transparent',
      color: colors.black,
      border: `2px solid ${colors.gray[200]}`,
    },
  },
};

export default Button;
