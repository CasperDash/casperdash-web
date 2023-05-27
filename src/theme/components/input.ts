import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

import colors from '../foundations/colors';
import radii from '../foundations/radii';
import space from '../foundations/space';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radii['2xl'],
    minH: `${space[12]}`,
  },
});

export const Input = defineMultiStyleConfig({ baseStyle });
