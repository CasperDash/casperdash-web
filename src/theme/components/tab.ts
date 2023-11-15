import type { ComponentStyleConfig } from '@chakra-ui/theme';

import colors from '../foundations/colors';

const Tabs: ComponentStyleConfig = {
  baseStyle: {
    root: {
      display: 'inline-block',
    },
  },
  variants: {
    line: {
      tablist: {
        position: 'relative',
        border: 'none',

        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-2px',

          width: '100%',
          height: '1px',
          background: colors.whiteAlpha[300],
        },
      },
      tab: {
        position: 'relative',
        border: 'none',
        color: colors.gray[300],

        _selected: {
          color: colors.primary,
          fontWeight: 500,

          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',

            borderRadius: '3px 3px 0 0',
            width: '100%',
            height: '3px',
            background: colors.primary,
            zIndex: 1,
          },
        },
      },
    },
  },
};

export default Tabs;
