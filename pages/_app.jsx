import '../styles/globals.scss'
import Head from 'next/head'
import { NextUIProvider } from '@nextui-org/react'

import favicon from 'public/favicon.ico'
import Layout from '../components/shared/Layout'
import { AppWrapper } from 'utils/context'

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
      <Layout>
        <AppWrapper>
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </AppWrapper>
      </Layout>
    </>
  )
}
