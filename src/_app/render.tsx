import { NextPage } from 'next';
import React from 'react';
import type {
  ExtendedOptions,
  NextApp,
  PageObject,
  PageProps,
} from '../commonTypes';
import { makeRouterMock } from '../router';

export default function renderApp({
  options,
  pageObject,
  pageProps,
}: {
  options: ExtendedOptions;
  pageObject: PageObject;
  pageProps: PageProps | undefined;
}): JSX.Element {
  const { env } = options;
  const {
    appFile: { default: AppComponent },
    pageFile: { default: PageComponent },
  } = pageObject.files[env];

  return renderEnhancedApp({
    App: AppComponent,
    Page: PageComponent,
    pageObject,
    pageProps,
    options,
  });
}

export function renderEnhancedApp({
  App,
  Page,
  pageObject,
  pageProps,
  options,
}: {
  App: NextApp;
  Page: NextPage;
  pageObject: PageObject;
  pageProps: PageProps | undefined;
  options: ExtendedOptions;
}) {
  const { wrapper = {} } = options;
  const appRouter = makeRouterMock({ options, pageObject });

  let UserEnhancedPage = Page;
  if (wrapper.Page) {
    UserEnhancedPage = wrapper.Page(Page);
  }

  return (
    <App
      Component={UserEnhancedPage}
      pageProps={pageProps}
      router={appRouter}
    />
  );
}
