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
  getFavorites(uIds) {
    return requests.post('/favorites', { uIds })
  }
  checkFavorite(bioid) {
    return requests.get(`/is-favorite/${bioid}`)
  }
  addToBookmark(uId) {
    return requests.get(`/add-favorites/${uId}`)
  }
  removeBookmark(uId) {
    return requests.delete(`/delete-favorites/${uId}`)
  }
  getFeatureds() {
    return requests.get('/get-featureds')
  }
  makeRequest(body) {
    return requests.post('/request-info', body)
  }
  deleteRequest(reason) {
    return requests.post('/delete-request', reason)
  }
  hideByUser() {
    return requests.get('/hide-by-user')
  }
  postMessage(body) {
    return requests.post('/post-message', body)
  }
}

export default new UserRequests()
