import requests from './http'

class BiodataRequests {
  getBios() {
    return requests.get('/bios')
  }
  getBioByID(id) {
    return requests.get(`/bio/${id}`)
  }
}

export default new BiodataRequests()
