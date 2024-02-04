import { useEffect, useState } from 'react'

export default function useToken() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const localToken = localStorage.getItem('token')
    setToken(localToken)
  }, [])

  return token
}
