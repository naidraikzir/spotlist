export const authUrl = 'https://accounts.spotify.com/authorize'
export const clientId = import.meta.env.VITE_CLIENT_ID
export const redirectUri = import.meta.env.VITE_CALLBACK_URL
export const scopes = [
  'user-read-private',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private'
].join(' ')
