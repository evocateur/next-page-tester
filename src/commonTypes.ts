import type {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPaths,
  NextPage,
  Redirect,
} from 'next';
import { AppContext, AppInitialProps } from 'next/app';
import type { NextRouter } from 'next/router';
import type { createResponse, createRequest } from 'node-mocks-http';
import type { ParsedUrlQuery } from 'querystring';
import type { DocumentType } from 'next/dist/next-server/lib/utils';
import { RuntimeEnvironment } from './constants';

export type Req = ReturnType<typeof createRequest>;
export type Res = ReturnType<typeof createResponse>;

export type ReqEnhancer = (req: Req) => Req;
export type ResEnhancer = (res: Res) => Res;

export type Options = {
  route: string;
  nextRoot?: string;
  req?: ReqEnhancer;
  res?: ResEnhancer;
  router?: (router: NextRouter) => NextRouter;
  useApp?: boolean;
  useDocument?: boolean;
  nonIsolatedModules?: string[];
};

export type OptionsWithDefaults = Required<Options>;

// Options object is extended with some extra derived props
export type ExtendedOptions = OptionsWithDefaults & {
  pagesDirectory: string;
  pageExtensions: string[];
  previousRoute?: string;
  env: RuntimeEnvironment;
};

/*
 * Page
 */
export type PageFile<FileType> = {
  client: FileType;
  server: FileType;
};

export type PageParams = ParsedUrlQuery;

export type RouteInfo = {
  params: PageParams;
  query: PageParams;
  route: string;
  pagePath: string;
  paramsNumber: number;
  resolvedUrl: string;
};

export type PageObject = RouteInfo & {
  page: PageFile<NextPageFile>;
  appFile: PageFile<NextAppFile>;
};

export type PageProps = {
  [key: string]: unknown;
};

export type PageData<P extends PageProps = PageProps> = {
  props?: P;
  redirect?: Redirect;
};

export type NextPageFile = {
  [name: string]: unknown;
  default: NextPage;
  getServerSideProps?: GetServerSideProps;
  getStaticProps?: GetStaticProps;
  getStaticPaths?: GetStaticPaths;
};

/*
 * App
 */

// @NOTE we might use: import type App from 'next/app';
// but I had troubles with setting up its generics
export type NextApp = React.FunctionComponent<{
  Component: NextPage;
  pageProps?: PageProps;
}> & {
  getInitialProps?: (appContext: AppContext) => Promise<AppInitialProps>;
};

export type NextAppFile = {
  [name: string]: unknown;
  default: NextApp;
};

export type NextDocumentFile = {
  default: DocumentType;
};

export class CustomError extends Error {
  payload?: unknown;
}

export type MakePageResult = {
  pageElement: JSX.Element;
  pageObject: PageObject;
};

export type PageInfo = {
  pageObject: PageObject;
  pageData: PageData;
};

export type PageComponents = {
  AppComponent: NextApp;
  PageComponent: NextPage;
};
