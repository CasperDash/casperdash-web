import { useState } from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import store from '@/store';
import theme from '@/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>CasperDash - Web</title>
        <link rel="shortcut icon" href="/img/chakra-logo.png" />
        <link rel="apple-touch-icon" href="/img/chakra-logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Provider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <Toaster />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          </QueryClientProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
};

export default MyApp;
