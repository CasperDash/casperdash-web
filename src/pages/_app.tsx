import { useState } from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ScriptProps } from 'next/script';
import { NextPage } from 'next/types';
import { appWithTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import store from '@/store';
import theme from '@/theme';

type Page<P = Record<string, never>> = NextPage<P> & {
  getLayout: (page: ScriptProps) => JSX.Element;
};

type Props = AppProps & {
  Component: Page;
};

const Noop = ({ children }: ScriptProps) => <>{children}</>;

const MyApp = ({ Component, pageProps }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout || Noop;

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
            {getLayout(<Component {...pageProps} />)}
            <Toaster />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          </QueryClientProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
};

export default appWithTranslation(MyApp);
