import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import api from '@/api'
import { authUrl, clientId, redirectUri, scopes } from '@/config'
import spotify from '@/assets/spotify.png'

function Login() {
  const navigate = useNavigate()

  async function fetchMe() {
    const { data } = await api.me()
    localStorage.setItem('me', JSON.stringify(data))
  }

  async function goToApp(access_token: string) {
    localStorage.setItem('access_token', access_token)
    await fetchMe()
    navigate('/profile')
  }

  useEffect(() => {
    if (window.location.hash) {
      const hash = new URLSearchParams(window.location.hash.substring(1))
      const access_token = hash.get('access_token')

      if (access_token) {
        goToApp(access_token)
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
