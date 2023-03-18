import { extendTheme } from '@chakra-ui/react';

import Button from './components/button';
import Tabs from './components/tab';
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import config from './foundations/config';
import fonts from './foundations/fonts';
import fontSizes from './foundations/fontSizes';
import fontWeights from './foundations/fontWeights';
import radii from './foundations/radii';
import shadows from './foundations/shadows';
import sizes from './foundations/sizes';
import space from './foundations/space';
import zIndices from './foundations/zIndecs';
import styles from './styles';

const customTheme = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors,
  sizes,
  fonts,
  config,
  shadows,
  breakpoints,
  zIndices,
  radii,
  fontSizes,
  fontWeights,
  space,
  components: {
    Button,
    Tabs,
  },
  styles,
};

export default extendTheme(customTheme);
