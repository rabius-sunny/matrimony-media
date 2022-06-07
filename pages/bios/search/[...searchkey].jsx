import CSkeleton from 'components/shared/CSkeleton'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import biodataRequests from 'services/biodataRequests'
import male from 'public/images/male.svg'
import female from 'public/images/female.svg'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

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
        <div className='my-4' style={{ minHeight: '60vh' }}>
          <div className='grid grid-cols-12 gap-8'>
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div
                key={item}
                className='col-span-12 sm:col-span-6 lg:col-span-4'
              >
                <CSkeleton duration={1.4} height={250} width={'100%'} />
              </div>
            ))}
          </div>
        </div>
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
        <div className='my-4' style={{ minHeight: '60vh' }}>
          <div className='grid grid-cols-12 gap-8'>
            {bios.map(item => (
              <div
                key={item?._id}
                className='col-span-12 sm:col-span-6 lg:col-span-4 bg-red-600 pt-8 border-2 border-red-500 duration-500 hover:scale-105 hover:shadow-lg'
              >
                <div className='text-center'>
                  <Image
                    width='150px'
                    height='150px'
                    src={item?.type === 'পাত্রের বায়োডাটা' ? male : female}
                    alt='avatar'
                  />
                </div>
                <div class='search-body'>
                  <span>বৈবাহিক অবস্থা </span>
                  <p>{item?.condition}</p>
                  <span>জন্মসন </span>
                  <p>{item?.birth}</p>
                  <span id='lastspan'>পেশা </span>
                  <p>{item?.profession}</p>
                </div>
                <div className='py-8 text-center bg-white'>
                  <Link href={`/bios/bio/${item?.user.username}`}>
                    <a className='bg-red-500 py-3 px-6 rounded shadow text-white'>
                      বায়োডাটা দেখুন
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
