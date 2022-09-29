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
  getFavorites() {
    return requests.get('/favorites')
  }
  checkFavorite(bioid) {
    return requests.get(`/is-favorite/${bioid}`)
  }
  addToBookmark(id) {
    return requests.get(`/post-favorites/${id}`)
  }
  removeBookmark(id) {
    return requests.delete(`/delete-favorites/${id}`)
  }
  getFeatureds() {
    return requests.get('/get-featureds')
  }
  makeRequest(body) {
    return requests.post('/request-info', body)
  }
  deleteHideRequest(reason) {
    return requests.post('/delete-hide-request', reason)
  }
  hideByUser() {
    return requests.get('/hide-by-user')
  }
  postMessage(body) {
    return requests.post('/post-message', body)
  }
}

export default new UserRequests()
