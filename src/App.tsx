import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { Query, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import * as _ from 'lodash-es';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { QueryKeysEnum } from './enums/queryKeys.enum';
import { browserRouter } from './router';
import store from '@/store';
import theme from '@/theme';

import '@fontsource/poppins/400.css';

(window as unknown as Window & { global?: Window }).global = window;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 365 * 100, // 100 years
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister,
            dehydrateOptions: {
              shouldDehydrateQuery: ({ queryKey }: Query) => {
                return [
                  QueryKeysEnum.TRANSACTION_HISTORIES,
                  QueryKeysEnum.CONNECTED_URL,
                ].includes(_.first(queryKey) as unknown as QueryKeysEnum);
              },
            },
          }}
        >
          <ChakraProvider resetCSS theme={theme}>
            <RouterProvider router={browserRouter} />
            <Toaster position="top-right" />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
      </Provider>
    </>
  );
};

export default App;
