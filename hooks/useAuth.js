import { useState, useEffect } from 'react'

export default function useAuth() {
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    const isAuth = localStorage.getItem('token') ? true : false
    setAuth(isAuth)
  }, [])
  return auth
}
