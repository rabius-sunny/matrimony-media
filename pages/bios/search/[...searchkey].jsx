import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import biodataRequests from 'services/network/biodataRequests'
import Head from 'next/head'
import BioCard from 'components/shared/BioCard'
import CardSkeleton from 'components/shared/CardSkeleton'
import { _femalecondition, _madhabs, _malecondition } from 'assets/profileinfo'
import FilterBio from 'components/others/FilterBio'

export default function SearchResult() {
  const {
    query: { searchkey },
    back
  } = useRouter()
  const [loading, setLoading] = useState(true)
  const [bios, setBios] = useState([])

  useEffect(() => {
    if (searchkey) {
      biodataRequests
        .getBios({
          type: searchkey?.[0],
          address: searchkey[1] === 'all' ? '' : searchkey[1]
        })
        .then((data) => {
          setBios(data.response)
        })
        .catch((err) => {
          alert('একটি ইরর হয়েছে, আবার চেষ্টা করুন')
          back()
        })
        .finally(() => setLoading(false))
    }
  }, [searchkey])

  return (
    <div
      className='mt-2 container'
      style={{ minHeight: '60vh' }}
    >
      <Head>
        <title>সার্চ করুন</title>
      </Head>

      <FilterBio
        type={searchkey?.[0]}
        jilla={searchkey?.[1]}
        setBios={setBios}
        setLoading={setLoading}
      />

      {loading && (
        <div className='container my-4'>
          <h1 className='text-3xl text-center'>Searching for Results</h1>
          <CardSkeleton />
        </div>
      )}
      {!bios?.length && (
        <h1 className='text-3xl pt-8 text-center text-primary  font-bold'>
          কোনো বায়োডাটা পাওয়া যায় নি। অন্যভাবে চেষ্টা করুন।
        </h1>
      )}
      {bios?.length && (
        <div>
          <div className='text-center text-rose-600 text-3xl mb-2'>
            সার্চ ফলাফল
          </div>
          <div className=' h-1 bg-rose-100 mb-8' />
          <div className='grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 xl:gap-8 mb-8'>
            {bios.map((bio, idx) => (
              <BioCard
                bio={{
                  bio: {
                    type: bio?.type,
                    condition: bio?.condition,
                    profession: bio?.profession,
                    birth: bio?.birth
                  },
                  uId: bio?.user?.uId
                }}
                key={idx}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
