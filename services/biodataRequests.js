import requests from './http'
class BiodataRequests {
  getBios(type, jilla) {
    return requests.get(`/home/${type}/${jilla}`)
  }
  getBioByID(id) {
    return requests.get(`/bio-user/${id}`)
  }
  getBioByToken() {
    return requests.get('/getbio-by-token')
  }
  updateBio(body) {
    return requests.post('/createorupdate-biodata', body)
  }
  setField(num) {
    return requests.get(`/set-field/${num}`)
  }
  checkField() {
    return requests.get('/check-field')
  }
}

export default new BiodataRequests()
