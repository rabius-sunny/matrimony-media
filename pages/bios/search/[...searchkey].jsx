import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import biodataRequests from 'services/biodataRequests'

export default function SearchResult() {
  const {
    query: { searchkey }
  } = useRouter()
  const [bios, setBios] = useState([])

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
    </div>
  )
}
