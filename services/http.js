import axios from 'axios'
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
console.log('baseUrl', baseURL)
const instance = axios.create({
  baseURL,
  timeout: 20000
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('Api is being called')
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
})

const responseBody = response => response.data

const requests = {
  get: url => instance.get(url).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  patch: (url, body) => instance.patch(url, body).then(responseBody),
  delete: url => instance.delete(url).then(responseBody)
}

export default requests
