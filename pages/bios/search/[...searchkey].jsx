import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import biodataRequests from 'services/biodataRequests'
import Head from 'next/head'
import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'
import { _femalecondition, _madhabs, _malecondition } from 'assets/profileinfo'
import FilterBio from 'components/others/FilterBio'

export default function SearchResult() {
  const {
    query: { searchkey }
  } = useRouter()
  const [loading, setLoading] = useState(true)
  const [bios, setBios] = useState(null)
  const [notUid, setNotUid] = useState(true)

  useEffect(() => {
    if (searchkey && searchkey.length > 2) {
      setNotUid(false)
      biodataRequests
        .getBioByUID(searchkey[2])
        .then(data => {
          data ? setBios([data.response]) : setBios(null)
          setLoading(false)
        })
        .catch(err => {
          console.log(err.message)
          setLoading(false)
        })
    } else if (searchkey && searchkey.length < 3) {
      console.log('else if')
      biodataRequests
        .getBios(searchkey[0], searchkey[1])
        .then(data => {
          setBios(data.response)
          console.log('response', data.response)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
    }
  }, [searchkey])

  if (loading) {
    return (
      <div className='container my-4'>
        <Head>
          <title>সার্চ করুন</title>
        </Head>
        <h1 className='text-3xl text-center'>Searching for Results</h1>
        <CardSkeleton />
      </div>
    )
  } else if ((!loading && bios !== null && !bios.length) || bios === null) {
    return (
      <div className='mt-2 container' style={{ minHeight: '70vh' }}>
        <Head>
          <title>সার্চ করুন</title>
        </Head>
        {notUid && (
          <FilterBio
            setLoading={setLoading}
            setBios={setBios}
            type={searchkey[0]}
            jilla={searchkey[1]}
          />
        )}
        <h1 className='text-3xl pt-8 text-center text-primary  font-bold'>
          কোনো বায়োডাটা পাওয়া যায় নি। অন্যভাবে চেষ্টা করুন।
        </h1>
      </div>
    )
  } else if (bios && bios.length >= 1) {
    return (
      <div className='my-4'>
        <Head>
          <title>সার্চ করুন</title>
        </Head>
        {notUid && (
          <FilterBio
            setLoading={setLoading}
            setBios={setBios}
            type={searchkey[0]}
            jilla={searchkey[1]}
          />
        )}

        <div className='my-4 container' style={{ minHeight: '70vh' }}>
          <div className='text-center text-rose-600 text-3xl mb-2'>
            সার্চ ফলাফল
          </div>
          <div className=' h-1 bg-rose-100 mb-8' />
          <div className='grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8'>
            {bios.map((bio, idx) => (
              <BioCard bio={bio} key={idx} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
