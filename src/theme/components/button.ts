import type { ComponentStyleConfig } from '@chakra-ui/theme';

import colors from '../foundations/colors';
import { hexToRgba } from '@/utils/color';

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 600,
    fontSize: 18,

    bg: colors.primary,
    background: colors.primary,
    color: colors.blackColor,

    w: '100%',
    minW: '100px',
    maxW: '360px',
    h: '50px',
    height: '50px',
    borderRadius: 100,
    padding: '0 30px',

    _hover: {
      filter: 'brightness(0.8)',
      bg: colors.primary,
      background: colors.primary,
      color: colors.blackColor,
    },

    _active: {
      filter: 'brightness(0.9)',
      bg: colors.primary,
      background: colors.primary,
      color: colors.blackColor,
    },
  },

  variants: {
    primary: {},

    'outline-primary': {
      bg: 'transparent',
      background: 'transparent',
      color: colors.primary,
      border: '1px solid',
      borderColor: colors.primary,

      _hover: {
        filter: 'brightness(0.95)',
        bg: colors.primary,
        background: hexToRgba(colors.primary, 0.1),
        color: colors.primary,
      },

      _active: {
        filter: 'brightness(0.95)',
        bg: colors.primary,
        background: hexToRgba(colors.primary, 0.3),
        color: colors.primary,
      },
    },

    secondary: {
      bg: colors.secondary,
      background: colors.secondary,
      color: '#fff',

      _hover: {
        filter: 'brightness(0.8)',
        bg: colors.secondary,
        background: colors.secondary,
        color: '#fff',
      },

      _active: {
        filter: 'brightness(0.9)',
        bg: colors.secondary,
        background: colors.secondary,
        color: '#fff',
      },
    },

    'outline-secondary': {
      bg: 'transparent',
      background: 'transparent',
      color: colors.secondary,
      border: '1px solid',
      borderColor: colors.secondary,

      w: '100%',
      maxW: '362px',
      h: '50px',
      height: '50px',
      borderRadius: 100,

      _hover: {
        filter: 'brightness(0.95)',
        bg: colors.secondary,
        background: hexToRgba(colors.secondary, 0.1),
        color: colors.secondary,
      },

      _active: {
        filter: 'brightness(0.95)',
        bg: colors.secondary,
        background: hexToRgba(colors.secondary, 0.3),
        color: colors.secondary,
      },
    },
  },
};

export default Button;
