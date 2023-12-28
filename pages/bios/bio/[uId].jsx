import { useState, useEffect } from 'react'
import DAddress from 'components/bio/DAddress'
import { useRouter } from 'next/router'
import biodataRequests from 'services/network/biodataRequests'
import DEducation from 'components/bio/DEducaiton'
import DFamily from 'components/bio/DFamily'
import DPersonal from 'components/bio/DPersonal'
import DMarital from 'components/bio/DMarital'
import DAnother from 'components/bio/DAnother'
import DExpect from 'components/bio/DExpect'
import CSkeleton from 'components/shared/CSkeleton'
import Head from 'next/head'
import userRequest from 'services/network/userRequest'
import BioInfoCard from 'components/bio/BioInfoCard'
import useAuth from 'hooks/useAuth'
import useAsync from 'hooks/useAsync'
import requests from 'services/network/http'
import LongModal from 'components/shared/Modals/LongModal'
import { Button } from '@nextui-org/react'

export default function DetailBio() {
  const {
    query: { uId }
  } = useRouter()
  const { data, error, isLoading } = useAsync(`/bio-id/${uId}`, requests.get)
  const [bio, setBio] = useState({})
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isBookmarkedLocal, setIsBookmarkedLocal] = useState(false)

  const router = useRouter()
  const auth = useAuth()

  console.log('response', { data, error, isLoading })

  // check favorite for signed user and public user
  // useEffect(() => {
  //   if (uId) {
  //     if (!auth) {
  //       // check for public
  //       const bookmarks = localStorage.getItem('bookmarks')
  //       if (bookmarks) {
  //         const result = JSON.parse(bookmarks)
  //         if (result.hasOwnProperty(uId)) {
  //           setIsBookmarkedLocal(true)
  //         }
  //       }
  //     } else {
  //       // check for user
  //       userRequest
  //         .checkFavorite(bio?._id)
  //         .then((res) => {
  //           if (res.message === 'exists') {
  //             setIsBookmarked(true)
  //           }
  //         })
  //         .catch((err) => err)
  //     }
  //   }
  // }, [uId, bio, auth])

  const handleBookmark = (_) => {
    if (auth) {
      if (isBookmarked) {
        userRequest
          .removeBookmark(bio?._id)
          .then((res) => {
            if (res.message === 'ok') {
              setIsBookmarked(false)
            }
          })
          .catch((err) => err)
      } else {
        userRequest
          .addToBookmark(bio?._id)
          .then((res) => {
            if (res.message === 'ok') {
              setIsBookmarked(true)
            }
          })
          .catch((err) => console.log('err', err))
      }
    } else {
      const bookmarks = localStorage.getItem('bookmarks')
      if (bookmarks) {
        const result = JSON.parse(bookmarks)
        if (result.hasOwnProperty(uId)) {
          delete result[uId]
          setIsBookmarkedLocal(false)
        } else {
          result[uId] = uId
          setIsBookmarkedLocal(true)
        }
        localStorage.setItem('bookmarks', JSON.stringify(result))
      } else {
        const bookmarkObj = { [uId]: uId }
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkObj))
        setIsBookmarkedLocal(true)
      }
    }
  }

  return !isLoading && data ? (
    <div className='container3 my-8'>
      <Head>
        <title>বায়োডাটা | {uId}</title>
      </Head>
      <div className=''>
        <BioInfoCard
          data={data?.bio?.card}
          loading={isLoading}
          uId={uId}
        />
        <div className='my-4'>
          <DAddress
            auth={auth}
            data={data?.bio?.address}
          />
        </div>

        <div className='my-4'>
          <DEducation
            auth={auth}
            data={data?.bio?.education}
          />
        </div>

        <div className='my-4'>
          <DFamily
            auth={auth}
            data={data?.bio?.family}
          />
        </div>

        <div className='my-4'>
          <DPersonal
            auth={auth}
            data={data?.bio?.personal}
          />
        </div>

        <div className='my-4'>
          <DMarital
            auth={auth}
            data={data?.bio?.marriage}
          />
        </div>

        <div className='my-4'>
          <DAnother
            auth={auth}
            data={data?.bio?.others}
          />
        </div>

        <div className='my-4'>
          <DExpect
            auth={auth}
            data={data?.bio?.expectation}
          />
        </div>
        <div className='mt-4'>
          <div className='my-8 flex flex-wrap gap-4'>
            <Button
              onPress={() => router.push(`/checkout/${uId}`)}
              className='bg-secondary w-full sm:w-auto'
            >
              অভিভাবকের সাথে যোগাযোগ করুন
            </Button>
            <Button
              onPress={handleBookmark}
              className='bg-primary w-full sm:w-auto'
            >
              {isBookmarkedLocal || isBookmarked
                ? 'ফেভারিট থেকে মুছে ফেলুন'
                : 'ফেভারিট এ যোগ করুন'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : error ? (
    <LongModal
      blur
      scroll={false}
      visible={true}
      onClose={() => router.back()}
      header='ইরর হয়েছে'
      body='কোন বায়োডাটা পাওয়া যায়নি।'
      btn='ফিরে যান'
      color='default'
      bodyColor='error'
    />
  ) : (
    <div className='container3'>
      <Head>
        <title>বায়োডাটা</title>
      </Head>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={200}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={100}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={400}
          width={'100%'}
        />
      </div>
      <div className='my-4'>
        <CSkeleton
          duration={1}
          height={300}
          width={'100%'}
        />
      </div>
    </div>
  )
}
