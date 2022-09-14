import Head from 'next/head' 
import { NextUIProvider } from '@nextui-org/react';
import { I18NProvider } from 'context/i18n';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <I18NProvider>
      <NextUIProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </NextUIProvider>
    </I18NProvider>
  )
}

export default MyApp
