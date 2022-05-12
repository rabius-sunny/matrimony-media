import axios from 'axios'
const baseUrl = process.env.REACT_APP_API_BASE_URL
console.log('baseUrl', baseUrl)
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
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
