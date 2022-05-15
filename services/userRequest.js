import requests from './http'

class UserRequests {
  signIn(body) {
    return requests.post('/sign-in', body)
  }
  getUser() {
    return requests.get('get-user')
  }
}

export default new UserRequests()
