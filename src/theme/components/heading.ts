import { defineStyle } from '@chakra-ui/react';

import fontSizes from '../foundations/fontSizes';
import fontWeights from '../foundations/fontWeights';
import lineHeights from '../foundations/lineHeights';

const Heading = defineStyle({
  fontWeight: fontWeights.semibold,

  variants: {
    xl: {
      fontSize: fontSizes.xl,
      lineHeight: lineHeights[8],
    },
    '2xl': {
      fontSize: fontSizes['2xl'],
      lineHeight: lineHeights[5],
    },
    '5xl': {
      fontSize: fontSizes['5xl'],
      lineHeight: lineHeights['12'],
    },
  },
});

export default Heading;
