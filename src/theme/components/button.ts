import type { ComponentStyleConfig } from '@chakra-ui/theme';

import colors from '../foundations/colors';
import fontWeights from '../foundations/fontWeights';
import space from '../foundations/space';

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: fontWeights.normal,
    fontSize: '14px',
    h: 'auto',

    minW: '120px',
    maxW: '1000px',
    borderRadius: '90px',
    padding: '12px 16px',
  },

  variants: {
    primary: {
      bg: colors.primary,
      background: colors.primary,
      color: colors.white,

      _hover: {
        bg: colors.light,
        color: colors.black,
        fontWeight: fontWeights.bold,
      },

      _active: {
        bg: colors.light,
        color: colors.white,
        fontWeight: fontWeights.bold,
      },
    },
    outline: {
      bg: colors.white,
      color: colors.black,
      border: `2px solid ${colors.gray[200]}`,

      _hover: {
        bg: colors.light,
      },
    },

    'light-outline': {
      bg: colors.white,
      color: colors.black,
      border: `2px solid ${colors.gray[200]}`,

      _hover: {
        fontWeight: fontWeights.bold,
        bg: colors.light,
      },
    },

    'light-outline-icon': {
      // h: '80px',
      bg: colors.white,
      color: colors.black,
      border: `1px solid ${colors.gray[200]}`,
      padding: '16px',
      borderRadius: '16px',
      h: 'auto',
      display: 'flex',
      justifyContent: 'flex-start',

      _active: {
        bg: colors.light,
        fontWeight: fontWeights.bold,
      },

      _hover: {
        bg: colors.light,
        fontWeight: fontWeights.bold,
      },

      '.chakra-button__icon': {
        mr: space[3],
      },
    },

    light: {
      bg: colors.white,
      color: colors.black,

      _active: {
        bg: colors.light,
        fontWeight: fontWeights.bold,
      },

      _hover: {
        bg: colors.light,
        fontWeight: fontWeights.bold,
      },
    },

    ghost: {
      _hover: {
        bg: colors.light,
      },
    },

    circle: {
      bg: 'transparent',
      color: colors.black,
      border: `2px solid ${colors.gray[200]}`,
      borderRadius: '99px',
      minW: 'auto',
      padding: '10px',
    },
  },
};

export default Button;
