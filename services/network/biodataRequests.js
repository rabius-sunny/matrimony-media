import requests from './http'
import useRequest from './useRequest'
class BiodataRequests {
  getBios(criteria) {
    return requests.post('/initial-filter', criteria)
  }

  filterBios(body) {
    return useRequest().post('/filter-bios', body)
  }

  getBioByUID(uId) {
    return useRequest().get(`/bio-id/${uId}`)
  }

  getBioByToken() {
    return useRequest().get('/getbio-by-token')
  }

  checkField() {
    return useRequest().get('/check-field')
  }

  updateBio(body) {
    return useRequest().post('/createorupdate-biodata', body)
  }

  publishRequest() {
    return useRequest('auth').get('/request-publish')
  }
}

export default new BiodataRequests()
