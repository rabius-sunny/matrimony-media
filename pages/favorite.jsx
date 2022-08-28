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
      const localBookmarkArray = Object.keys(JSON.parse(bookmarks))
      setLocalBookmark(localBookmarkArray)
    }
  }, [])

  useEffect(() => {
    localBookmark &&
      localBookmark.map(item =>
        requests
          .get(`/bio-id/${item}`)
          .then(data => setDatafromLocal(prev => [...prev, data.response]))
          .catch(err => err)
      )
  }, [localBookmark])

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks')
    if (bookmarks && localBookmark) {
      datafromLocal.length === 0 && setLocalLoading(true)
    }
    return () => setLocalLoading(false)
  }, [datafromLocal.length])

  return (
    <div className='container'>
      <Head>
        <title>পছন্দের বায়োডাটাসমূহ</title>
      </Head>
      <ColoredHeader heading='পছন্দের বায়োডাটাসমূহ' />
      {isLoading || localLoading ? (
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
        localBookmark && datafromLocal.length > 0 ? (
          <div className='container my-8'>
            <div className='grid grid-cols-12 gap-8'>
              {datafromLocal.map(bio => (
                <BioCard bio={bio} />
              ))}
            </div>
          </div>
        ) : (
          <div className='mt-12' style={{ minHeight: '70vh' }}>
            <h1 className='text-3xl text-center text-red-500 font-bold'>
              কোনো পছন্দের বায়োডাটা নেই।
            </h1>
          </div>
        )
      ) : (
        <div className='container my-8'>
          <div className='grid grid-cols-12 gap-8'>
            {data.bios.map(bio => (
              <BioCard bio={bio} type='userid' />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
