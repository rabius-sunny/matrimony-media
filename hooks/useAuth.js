import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function useAuth() {
  const router = useRouter()
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    const isAuth = localStorage.getItem('token') ? true : false
    setAuth(isAuth)
  }, [router.pathname])
  return auth
}
