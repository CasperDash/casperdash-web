import { useState } from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { browserRouter } from './router';
import store from '@/store';
import theme from '@/theme';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={browserRouter} />
          <Toaster />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
