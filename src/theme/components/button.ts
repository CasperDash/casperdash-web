import type { ComponentStyleConfig } from '@chakra-ui/theme';

import colors from '../foundations/colors';

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 700,
    fontSize: '14px',

    minW: '120px',
    maxW: '360px',
    borderRadius: '90px',
    padding: '12px 16px',
  },

  variants: {
    primary: {
      bg: colors.primary,
      background: colors.primary,
      color: colors.white,

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
        color: colors.white,
      },
    },

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
