import useRequest from './useRequest'

class UserRequests {
  signIn(body) {
    return useRequest().post('/sign-in', body)
  }
  getUser() {
    return useRequest().get('/get-user')
  }
  getType() {
    return useRequest().get('/get-type')
  }
  getFavorites(uIds) {
    return useRequest().post('/favorites', { uIds })
  }
  checkFavorite(bioid) {
    return useRequest().get(`/is-favorite/${bioid}`)
  }
  addToBookmark(uId) {
    return useRequest().get(`/add-favorites/${uId}`)
  }
  removeBookmark(uId) {
    return useRequest().delete(`/delete-favorites/${uId}`)
  }
  getFeatureds() {
    return useRequest().get('/get-featureds')
  }
  makeRequest(body) {
    return useRequest().post('/request-info', body)
  }
  deleteRequest(reason) {
    return useRequest().post('/delete-request', reason)
  }
  hideByUser() {
    return useRequest().get('/hide-by-user')
  }
  postMessage(body) {
    return useRequest().post('/post-message', body)
  }
}

export default new UserRequests()
