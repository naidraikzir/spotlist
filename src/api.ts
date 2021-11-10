import axios from 'axios'

const request = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

request.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
  return config
})

request.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.clear()
      window.location.reload()
    }
    return error
  }
)

const api = {
  me: () => request.get('/me'),
  playlists: () => request.get('/me/playlists'),
  playlist: (id: string) => request.get(`/playlists/${id}`),
  deletePlaylistItem: (id: string, uri: string) => request.delete(
    `/playlists/${id}/tracks`,
    { data: { tracks: [{ uri }] } }
  ),
}

export default api
