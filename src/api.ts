import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

request.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  return config
})

const api = {}

export default api
