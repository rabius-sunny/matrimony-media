import axios from 'axios'

export default function useRequest(check = null) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const instance = axios.create({
    baseURL,
    timeout: 20000
  })
  const shouldCheckAuth = check === 'auth'

  const checkAuthStatus = async () => {
    try {
      const response = await instance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/check-auth`
      )
      if (response.data.auth) {
        // Adding a request interceptor
        return instance.interceptors.request.use(function (config) {
          return {
            ...config,
            headers: {
              Authorization: `Bearer ${response.data.data}`
            }
          }
        })
      }
    } catch (error) {
      throw new Error('Error checking authentication status')
    }
  }

  // Common function to get acctual data from response
  const responseBody = (response) => response.data

  return {
    get: async (url) => {
      shouldCheckAuth && (await checkAuthStatus())
      return instance.get(url).then(responseBody)
    },
    post: async (url, body) => {
      await checkAuthStatus()
      return instance.post(url, body).then(responseBody)
    },
    patch: async (url, body) => {
      await checkAuthStatus()
      return instance.patch(url, body).then(responseBody)
    },
    delete: async (url) => {
      await checkAuthStatus()
      return instance.delete(url).then(responseBody)
    }
  }
}
