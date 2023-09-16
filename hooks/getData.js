import { useEffect, useState } from 'react'
import requests from 'services/network/http'

export default function getData(dep) {
  const [data, setData] = useState(null)
  const [loading, isLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    isLoading(true)
    setData(null)
    setError(null)

    requests
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bio/${localStorage.getItem(
          'id'
        )}`
      )
      .then((res) => {
        setData(res)
        isLoading(false)
        setError(null)
      })
      .catch((err) => {
        setError(err)
        isLoading(false)
        setData(null)
      })
  }, [dep])

  return {
    data: data?.response,
    error,
    loading
  }
}
