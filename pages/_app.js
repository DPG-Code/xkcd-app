import '../styles/globals.css'
import Head from 'next/head' 
import { I18NProvider } from 'context/i18n';
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {},
  }
})
const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {},
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <I18NProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className
        }}
      >
        <NextUIProvider>
          <Head>
            <link rel="icon" href="/icon.png" />
          </Head>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </I18NProvider>
  )
}

export default MyApp
