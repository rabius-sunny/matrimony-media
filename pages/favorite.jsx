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
  const { data, isLoading, error } = useAsync(userRequest.getFavorites)

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
      ) : (!isLoading && data?.bios.length === 0) || (auth && data === null) ? (
        <div className='mt-12' style={{ minHeight: '70vh' }}>
          <h1 className='text-3xl text-center text-red-500 font-bold'>
            কোনো পছন্দের বায়োডাটা নেই। <br />
            {error && `Error: ${error.message}`}
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
          <div className='grid grid-cols-12 gap-8'>
            {data.bios.map(bio => (
              <BioCard bio={bio} type='id' />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
