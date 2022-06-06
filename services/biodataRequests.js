import requests from './http'
class BiodataRequests {
  getBios(type, jilla) {
    return requests.get(`/home/${type}/${jilla}`)
  }
  getBioByID(id) {
    return requests.get(`/bio-username/${id}`)
  }
  updateBio(body) {
    return requests.post('/createorupdate-biodata', body)
  }
}

export default new BiodataRequests()
