import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Drawer: ComponentStyleConfig = {
  parts: ['dialog', 'header', 'body'],
  variants: {
    primary: {},
    secondary: {
      dialog: {
        maxW: '200px',
      },
    },
  },
};

export default Drawer;
