import { NextComponentType } from 'next';
import { AppProps } from 'next/app';
import 'bulma/css/bulma.css';
import 'components/common/loader/loader.css';
import NotFoundPage from './index.tsx';


function MyApp({ Component, pageProps, err }: AppProps & { err?: any }) {
  if (err && err.statusCode === 404) {
    return <NotFoundPage />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
