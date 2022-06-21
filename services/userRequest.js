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
}

export default new UserRequests()
