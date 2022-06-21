import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
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

  console.log('bios', bios)

  useEffect(() => {
    if (searchkey && searchkey.length > 2) {
      biodataRequests
        .getBioByID(searchkey[2])
        .then(data => {
          data.response.length > 0 ? setBios(data.response) : setBios(null)
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
          data.response.length >= 1 ? setBios(data.response) : setBios(null)
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
  } else if ((!loading && bios !== null && !bios.length) || bios === null) {
    return (
      <div className='mt-12' style={{ minHeight: '70vh' }}>
        <Head>
          <title>সার্চ করুন</title>
        </Head>
        <h1 className='text-3xl text-center text-red-500 font-bold'>
          কোনো বায়োডাটা পাওয়া যায় নি। অন্যভাবে চেষ্টা করুন।
        </h1>
      </div>
    )
  } else if (bios && bios.length >= 1) {
    return (
      <div className='container my-4'>
        <div className='my-4' style={{ minHeight: '70vh' }}>
          <Head>
            <title>সার্চ করুন</title>
          </Head>
          <h1 className='text-3xl my-8 text-center'>Search Results</h1>
          <div className='grid grid-cols-12 gap-8'>
            {bios.map(bio => (
              <BioCard bio={bio} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
