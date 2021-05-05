import React from 'react';

export default function CustomApp({ Component, pageProps, router }) {
  return (
    <>
      _app
      <Component {...pageProps} />
      <p>appProps.router.asPath: {router.asPath}</p>
    </>
  );
}

CustomApp.getInitialProps = async (appContext) => {
  return {
    pageProps: {
      ctx: appContext,
      fromCustomApp: true,
      propNameCollision: 'from-app',
    },
  };
};
