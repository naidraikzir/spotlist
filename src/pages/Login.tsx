import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import spotify from '@/spotify.png'
import api from '@/api'
import { authUrl, clientId, redirectUri, scopes } from '@/config'

function Login() {
  const navigate = useNavigate()

  async function fetchMe() {
    const { data } = await api.me()
    localStorage.setItem('me', JSON.stringify(data))
  }

  useEffect(async () => {
    if (window.location.hash) {
      const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce((obj, item) => {
          if (item) {
            const parts = item.split('=')
            obj[parts[0]] = decodeURIComponent(parts[1])
          }
          return obj
        }, {})

      if (hash.access_token) {
        localStorage.setItem('access_token', hash.access_token)
        await fetchMe()
        navigate('/profile')
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <a
        href={`${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`}
        className="bg-green-500 text-black text-2xl font-bold px-8 py-4 cursor-pointer text-center"
      >
        <img
          src={spotify}
          alt="Spotify"
          className="inline mr-4 w-14"
        />
        Login To Spotify
      </a>
    </div>
  )
}

export default Login
