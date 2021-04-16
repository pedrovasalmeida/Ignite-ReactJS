import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { QueryClient, QueryClientProvider } from 'react-query';
import { makeServer } from '../services/mirage';

import { theme } from '../styles/theme';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarDrawerProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SidebarDrawerProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
