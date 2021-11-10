export const authUrl = 'https://accounts.spotify.com/authorize'
export const clientId = import.meta.env.VITE_CLIENT_ID
export const redirectUri = 'http://localhost:3000'
export const scopes = [
  'user-read-private',
  'playlist-read-private',
  'playlist-modify-private'
].join(' ')
