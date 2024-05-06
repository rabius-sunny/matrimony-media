import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function useRequest() {
  const { data: session } = useSession()
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const instance = axios.create({
    baseURL,
    timeout: 20000
  })

  // Adding a request interceptor
  if (session) {
    instance.interceptors.request.use(function (config) {
      return {
        ...config,
        headers: {
          Authorization: `Bearer ${session.user.email}`
        }
      }
    })
  }

  // Common function to get acctual data from response
  const responseBody = (response) => response.data

  return {
    get: (url) => instance.get(url).then(responseBody),
    post: (url, body) => instance.post(url, body).then(responseBody),
    patch: (url, body) => instance.patch(url, body).then(responseBody),
    delete: (url) => instance.delete(url).then(responseBody)
  }
}
