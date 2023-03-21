import type { ComponentStyleConfig } from '@chakra-ui/theme';

import colors from '../foundations/colors';
import fontWeights from '../foundations/fontWeights';
import space from '../foundations/space';
import { hexToRgba } from '@/utils/color';

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
        bg: hexToRgba(colors.primary, 0.6),
        color: colors.black,
        fontWeight: fontWeights.bold,
      },

      _active: {
        bg: hexToRgba(colors.primary, 0.8),
        color: colors.white,
        fontWeight: fontWeights.bold,
      },
    },

    'light-outline': {
      bg: colors.white,
      color: colors.black,
      border: `2px solid ${colors.gray[200]}`,
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
        bg: hexToRgba(colors.primary, 0.8),
        color: colors.white,
        fontWeight: fontWeights.bold,
      },

      _hover: {
        bg: hexToRgba(colors.primary, 0.8),
        color: colors.white,
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
        bg: hexToRgba(colors.primary, 0.8),
        color: colors.white,
        fontWeight: fontWeights.bold,
      },

      _hover: {
        bg: hexToRgba(colors.primary, 0.8),
        color: colors.white,
        fontWeight: fontWeights.bold,
      },
    },

    circle: {
      bg: 'transparent',
      color: colors.black,
      border: `2px solid ${colors.gray[200]}`,
    },
  },
};

export default Button;
