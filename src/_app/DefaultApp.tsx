import React from 'react';
import type { NextPage } from 'next';
import type { PageProps } from '../commonTypes';
import type { AppContext, AppInitialProps } from 'next/app';
import type { NextRouter } from 'next/router';

interface AppProps {
  Component: NextPage;
  pageProps: PageProps | undefined;
  router: NextRouter;
}

/* TODO: we should be using DefaultApp from next/app as it has some custom logic */
const DefaultApp: React.VFC<AppProps> & {
  getInitialProps?: (appContext: AppContext) => Promise<AppInitialProps>;
} = function DefaultApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
};

export default DefaultApp;
