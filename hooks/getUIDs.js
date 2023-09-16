import { useEffect, useState } from 'react'
import requests from 'services/network/http'

export default function getUIDs() {
  const [uIds, setUIds] = useState(null)

  useEffect(() => {
    setUIds(null)

    requests
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-uids`)
      .then((res) => {
        setUIds(res.uIds)
      })
      .catch((err) => {
        setUIds(null)
      })
  }, [])

  return {
    uIds
  }
}
