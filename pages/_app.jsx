import '../styles/globals.css'
import '../styles/main.scss'
import Head from 'next/head'

import Navigation from '../components/shared/Navigation'
import Footer from '../components/shared/Footer'
import Layout from '../components/shared/Layout'

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Poppins:ital,wght@0,300;0,400;0,600;1,700&display=swap" rel="stylesheet" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}
