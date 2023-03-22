import { useState } from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { browserRouter } from './router';
import store from '@/store';
import theme from '@/theme';

(window as unknown as Window & { global?: Window }).global = window;

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <RouterProvider router={browserRouter} />
          <Toaster position="top-right" />
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
