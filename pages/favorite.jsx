import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'
import useAsync from 'hooks/useAsync'
import useAuth from 'hooks/useAuth'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import requests from 'services/http'
import userRequest from 'services/userRequest'
import ColoredHeader from '../components/shared/ColoredHeader'

export default function Favorite() {
  const auth = useAuth()
  const { data, isLoading, error } = useAsync(userRequest.getFavorites)
  const [localBookmark, setLocalBookmark] = useState(null)
  const [datafromLocal, setDatafromLocal] = useState([])
  const [localLoading, setLocalLoading] = useState(false)

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks')
    if (bookmarks) {
      setLocalLoading(true)
      const localBookmarkArray = Object.keys(JSON.parse(bookmarks))
      setLocalBookmark(localBookmarkArray)
    }
  }, [])

  useEffect(() => {
    if (localBookmark) {
      requests
        .post(`/favorites`, { uIds: localBookmark })
        .then(data => setDatafromLocal(data?.response))
        .catch(err => err)

      setLocalLoading(false)
    }
  }, [localBookmark])

  return (
    <div>
      <Head>
        <title>পছন্দের বায়োডাটাসমূহ | জান্নাতি জুটি.COM</title>
      </Head>
      <ColoredHeader heading='পছন্দের বায়োডাটাসমূহ' />
      {localLoading || isLoading ? (
        <div className='container my-4'>
          <CardSkeleton />
        </div>
      ) : ((!localLoading || !isLoading) && data?.bios?.length === 0) ||
        (auth && data === null) ? (
        <div className='mt-12' style={{ minHeight: '70vh' }}>
          <h1 className='text-3xl text-center text-primary font-bold'>
            কোনো পছন্দের বায়োডাটা নেই। <br />
            {error && `Error: ${error.message}`}
          </h1>
        </div>
      ) : !auth && data === null ? (
        localBookmark && datafromLocal.length > 0 ? (
          <div className='container my-8'>
            <div className='grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8'>
              {datafromLocal.map(bio => (
                <BioCard bio={bio?.bio} type='userid' />
              ))}
            </div>
          </div>
        ) : (
          <div className=' container mt-12' style={{ minHeight: '70vh' }}>
            <h1 className='text-3xl text-center text-primary font-bold'>
              কোনো পছন্দের বায়োডাটা নেই।
            </h1>
          </div>
        )
      ) : (
        <div className='container my-8'>
          <div className='grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8'>
            {data.bios.map(bio => (
              <BioCard bio={bio} type='userid' />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
