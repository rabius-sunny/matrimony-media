import requests from './http'
class BiodataRequests {
  getBios(type, jilla) {
    return requests.get(`/home/${type}/${jilla}`)
  }

  filterBios(body) {
    return requests.post('/filter-bios', body)
  }

  getBioByUID(uId) {
    return requests.get(`/bio-id/${uId}`)
  }

  getBioByToken() {
    return requests.get('/getbio-by-token')
  }

  updateBio(body) {
    return requests.post('/createorupdate-biodata', body)
  }
}

export default new BiodataRequests()
