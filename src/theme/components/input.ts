import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

import colors from '../foundations/colors';
import radii from '../foundations/radii';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radii['2xl'],
  },
});

export const Input = defineMultiStyleConfig({ baseStyle });
