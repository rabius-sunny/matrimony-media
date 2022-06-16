import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'
import useAsync from 'hooks/useAsync'
import useAuth from 'hooks/useAuth'
import Head from 'next/head'
import Link from 'next/link'
import userRequest from 'services/userRequest'
import ColoredHeader from '../components/shared/ColoredHeader'

export default function Favorite() {
  const auth = useAuth()
  const { data, isLoading } = useAsync(userRequest.getFavorites)

  return (
    <div className='container'>
      <Head>
        <title>পছন্দের বায়োডাটাসমূহ</title>
      </Head>
      <ColoredHeader heading='পছন্দের বায়োডাটাসমূহ' />
      {isLoading ? (
        <div className='container my-4'>
          <CardSkeleton />
        </div>
      ) : !isLoading && data?.bios.length === 0 ? (
        <div className='mt-12' style={{ minHeight: '70vh' }}>
          <h1 className='text-3xl text-center text-red-500 font-bold'>
            কোনো বায়োডাটা নেই।
          </h1>
        </div>
      ) : !auth && data === null ? (
        <div className='mt-12' style={{ minHeight: '70vh' }}>
          <h1 className='text-3xl text-center text-red-500 font-bold'>
            পছন্দের বায়োডাটা দেখতে{' '}
            <Link href='/sign-in'>
              <a className='underline'> লগিন </a>
            </Link>
            করুন
          </h1>
        </div>
      ) : (
        <div className='container my-8'>
          <BioCard bios={data.bios} />
        </div>
      )}
    </div>
  )
}
