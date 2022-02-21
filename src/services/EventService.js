import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://my-json-server.typicode.com/marnelfr/vuejs',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEventList(page) {
    return apiClient.get(`/events?_limit=2&_page=${page}`)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  }
}