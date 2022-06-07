import Head from 'next/head'
import Home from '../components/home/Home'

export default function index() {
  return (
    <>
      <Head>
        <title>ম্যাট্রিমনি মিডিয়া</title>
      </Head>
      <main>
        <Home />
      </main>
    </>
  )
}
