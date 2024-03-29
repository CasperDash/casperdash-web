import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Routes } from '@generouted/react-router';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { Query, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import * as _ from 'lodash-es';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import BackgroundTransactions from './modules/BackgroundTransactions';
import { QueryKeysEnum } from '@/enums/queryKeys.enum';
import store from '@/store';
import theme from '@/theme';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

(window as unknown as Window & { global?: Window }).global = window;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 365 * 100, // 100 years
      refetchOnWindowFocus: false,
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
                  QueryKeysEnum.ACCOUNT_BALANCES,
                  QueryKeysEnum.AIRDROP_CODE,
                  QueryKeysEnum.NFTS,
                  QueryKeysEnum.VALIDATORS,
                  QueryKeysEnum.VALIDATOR_DETAILS,
                  QueryKeysEnum.ACCOUNT_DELEGATOR_REWARDS,
                  QueryKeysEnum.ACCOUNT_TOTAL_REWARDS,
                  QueryKeysEnum.ACCOUNT_DELEGATION,
                ].includes(_.first(queryKey) as unknown as QueryKeysEnum);
              },
            },
          }}
        >
          <ChakraProvider resetCSS theme={theme}>
            <Routes />
            <Toaster position="bottom-right" richColors closeButton />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <BackgroundTransactions />
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </PersistQueryClientProvider>
      </Provider>
    </>
  );
};

export default App;
