import '../styles/globals.scss'
import Head from 'next/head'
import { NextUIProvider } from '@nextui-org/react'
import { MantineProvider } from '@mantine/core'

import Layout from '../components/shared/Layout'
import { AppWrapper } from 'utils/context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import state, { persistor } from 'services/state'

export default function MyApp({ Component, pageProps }) {
  process.env.NODE_ENV === 'production' &&
    console.log(`
  developer: Rabius Sunny \n
  facebook: fb.com/rabibinsalam \n
  linkedin: linkedin.com/in/rabius-sunny
  `)
  return (
    <>
      <Head>
        <link
          rel='icon'
          type='image/x-icon'
          href='./favicon.ico'
        />
      </Head>
      <Provider store={state}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <Layout>
            <AppWrapper>
              <NextUIProvider>
                <MantineProvider
                  withGlobalStyles
                  withNormalizeCSS
                >
                  <Component {...pageProps} />
                </MantineProvider>
              </NextUIProvider>
            </AppWrapper>
          </Layout>
        </PersistGate>
      </Provider>
    </>
  )
}
