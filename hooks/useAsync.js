import { useEffect, useState } from 'react'

export default function useAsync(asyncFunction) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    setStatus('pending')
    setData(null)
    setError(null)
    asyncFunction()
      .then(res => {
        setData(res)
        setStatus('success')
        setError(null)
      })
      .catch(err => {
        setError(err)
        setStatus('error')
        setData(null)
      })
  }, [asyncFunction])

  return {
    data,
    error,
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error'
  }
}
