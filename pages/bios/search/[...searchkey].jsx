import CSkeleton from 'components/shared/CSkeleton'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { HeartIcon as HeartF } from '@heroicons/react/solid'
import { HeartIcon as HeartO } from '@heroicons/react/outline'
import biodataRequests from 'services/biodataRequests'
import Head from 'next/head'
import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'

export default function SearchResult() {
  const {
    query: { searchkey }
  } = useRouter()
  const [loading, setLoading] = useState(true)
  const [bios, setBios] = useState(null)

  useEffect(() => {
    if (searchkey && searchkey.length > 2) {
      biodataRequests
        .getBioByID(searchkey[2])
        .then(data => {
          setBios(data.response)
          setLoading(false)
        })
        .catch(err => {
          console.log(err.message)
          setLoading(false)
        })
    } else if (searchkey && searchkey.length > 0 && !searchkey[2]) {
      biodataRequests
        .getBios(searchkey[0], searchkey[1])
        .then(data => {
          setBios(data.response)
          setLoading(false)
        })
        .catch(err => {
          console.log(err.message)
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
  } else if (!loading && bios === null) {
    return (
      <div className='mt-12' style={{ minHeight: '70vh' }}>
        <h1 className='text-3xl text-center text-red-500 font-bold'>
          কোনো বায়োডাটা পাওয়া যায় নি। অন্যভাবে চেষ্টা করুন।
        </h1>
      </div>
    )
  } else {
    return (
      <div className='container my-4'>
        <h1 className='text-3xl text-center'>Search Results</h1>
        <BioCard bios={bios} />
      </div>
    )
  }
}
