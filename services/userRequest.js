import requests from './http'

class UserRequests {
  signIn(body) {
    return requests.post('/sign-in', body)
  }
  getUser() {
    return requests.get('/get-user')
  }
  getType() {
    return requests.get('/get-type')
  }
}

export default new UserRequests()
