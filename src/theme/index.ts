import { extendTheme } from '@chakra-ui/react';

// Components
import Button from './components/button';
import Drawer from './components/drawer';
import Heading from './components/heading';
import { Input } from './components/input';
import RadioButtons from './components/radioButtons';
import Tabs from './components/tab';
// Styles.
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import config from './foundations/config';
import fonts from './foundations/fonts';
import fontSizes from './foundations/fontSizes';
import fontWeights from './foundations/fontWeights';
import lineHeights from './foundations/lineHeights';
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
  config,
  shadows,
  breakpoints,
  zIndices,
  lineHeights,
  radii,
  fontSizes,
  fontWeights,
  space,

  components: {
    Button,
    Tabs,
    Heading,
    RadioButtons,
    Input,
    Drawer,
  },
  styles,
  fonts,
};

export default extendTheme(customTheme);
