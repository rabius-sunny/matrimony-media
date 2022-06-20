import '../styles/globals.scss'
import Head from 'next/head'

import Layout from '../components/shared/Layout'
import { AppWrapper } from 'utils/context'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href='https://fonts.maateen.me/siyam-rupali/font.css'
          rel='stylesheet'
        />
      </Head>
      <Layout>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </Layout>
    </>
  )
}
