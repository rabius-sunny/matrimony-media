import requests from './http'

class BiodataRequests {
  getBios(page) {
    return requests.get(`/home/${page}`)
  }
  getBioByID(id) {
    return requests.get(`/bio/${id}`)
  }
  updateBio(body) {
    return requests.post('/createorupdate-biodata', body)
  }
}

export default new BiodataRequests()
