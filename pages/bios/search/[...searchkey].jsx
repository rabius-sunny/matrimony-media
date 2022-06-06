import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import biodataRequests from 'services/biodataRequests'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SearchResult() {
  const {
    query: { searchkey }
  } = useRouter()
  const [bios, setBios] = useState([])

  console.log(bios)

  useEffect(() => {
    if (searchkey && searchkey.length > 0) {
      biodataRequests
        .getBios(searchkey[0], searchkey[1])
        .then(data => setBios(data.response))
        .catch(err => alert(err.message))
    }
  }, [searchkey])

  return (
    <div>
      <h1 className='text-3xl text-center'>Search Result</h1>
      <div className='my-4'>
        <SkeletonTheme color='#c9c9c9' highlightColor='#fff'>
          <p>
            <Skeleton duration={2} height={250} width={300} count={5} />
          </p>
        </SkeletonTheme>
        <SkeletonTheme color='#c9c9c9' highlightColor='#fff'>
          <p>
            <Skeleton duration={2} height={250} width={300} count={5} />
          </p>
        </SkeletonTheme>
      </div>
    </div>
  )
}
