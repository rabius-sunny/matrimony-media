import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'
import useAuth from 'hooks/useAuth'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import userRequest from 'services/network/userRequest'
import ColoredHeader from '../components/shared/ColoredHeader'
import { useSelector } from 'react-redux'

export default function Favorite() {
  const auth = useAuth()
  const [data, setData] = useState(null)
  const { bookmarks, localBookmarks } = useSelector((state) => state.data)
  const [netState, setNetState] = useState({
    loading: true,
    error: false
  })

  useEffect(() => {
    if (auth && bookmarks?.length) {
      userRequest
        .getFavorites(bookmarks)
        .then((data) => data.data.length && setData(data.data))
        .catch((err) => setNetState({ error: !!err }))
        .finally(() => setNetState({ loading: false }))
    } else if (!auth && localBookmarks.length > 0) {
      userRequest
        .getFavorites(localBookmarks)
        .then((data) => data.data.length && setData(data.data))
        .catch((err) => setNetState({ error: !!err }))
        .finally(() => setNetState({ loading: false }))
    } else {
      setNetState({ loading: false })
      setData([])
    }
  }, [auth])

  return (
    <div className='min-h-[50vh]'>
      <Head>
        <title>পছন্দের বায়োডাটাসমূহ | জান্নাতি জুটি.COM</title>
      </Head>
      <ColoredHeader heading='পছন্দের বায়োডাটাসমূহ' />
      {!data || netState.loading ? (
        <div className='container my-4'>
          <CardSkeleton />
        </div>
      ) : netState.error ? (
        <div
          className=' container mt-12'
          style={{ minHeight: '60vh' }}
        >
          <h1 className='text-3xl text-center text-primary font-bold'>
            ইরর হয়েছে আবার চেষ্টা করুন।
          </h1>
        </div>
      ) : data?.length === 0 ? (
        <div
          className=' container mt-12'
          style={{ minHeight: '60vh' }}
        >
          <h1 className='text-3xl text-center text-primary font-bold'>
            কোনো পছন্দের বায়োডাটা নেই।
          </h1>
        </div>
      ) : (
        <div className='container my-8'>
          <div className='grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8'>
            {data?.map((bio, idx) => (
              <BioCard
                key={idx}
                bio={bio}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
