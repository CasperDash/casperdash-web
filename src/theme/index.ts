import { extendTheme } from '@chakra-ui/react';

import Button from './components/button';
import Tabs from './components/tab';
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import config from './foundations/config';
import fonts from './foundations/fonts';
import shadows from './foundations/shadows';
import zIndices from './foundations/zIndecs';
import styles from './styles';

const customTheme = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors,
  styles,
  fonts,
  config,
  shadows,
  breakpoints,
  zIndices,
  components: {
    Button,
    Tabs,
  },
};

export default extendTheme(customTheme);
