import { extendTheme } from '@chakra-ui/react';

import Button from './components/button';
import Tabs from './components/tab';
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import config from './foundations/config';
import fonts from './foundations/fonts';
import shadows from './foundations/shadows';
import space from './foundations/space';
import zIndices from './foundations/zIndecs';
import styles from './styles';

const customTheme = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors,
  fonts,
  config,
  shadows,
  breakpoints,
  zIndices,
  space,
  components: {
    Button,
    Tabs,
  },
  styles,
};

export default extendTheme(customTheme);
