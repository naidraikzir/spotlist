import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import api from '@/api'
import avatar from '@/avatar.png'

function Profile() {
  const navigate = useNavigate()
  const [me, setMe] = useState({
    images: []
  })
  const [playlists, setPlaylists] = useState([])

  async function fetchMe() {
    const { data } = await api.me()
    setMe(data)
  }

  async function fetchPlaylists() {
    const { data } = await api.playlists()
    setPlaylists(data.items)
  }

  function logout() {
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    fetchMe()
    fetchPlaylists()
  }, [])

  return (
    <div className="max-w-[1280px] mx-auto font-bold">
      <div className="flex justify-end">
        <div className="mr-8 mt-auto text-right">
          <div className="text-lg font-bold">{me.display_name}</div>
          <a
            className="block mt-4 cursor-pointer"
            onClick={logout}
          >
            Log Out
          </a>
        </div>
        <img
          src={me.images.length ? me.images[0].url : avatar}
          alt={me.display_name}
          width="180"
        />
      </div>

      <h3 className="mt-12 text-lg">Playlists</h3>
      <div className="flex flex-wrap mt-6">
        {playlists.map((playlist, p) => (
          <Link
            key={p}
            className="mb-8 w-1/2 md:w-1/4 lg:w-1/5 cursor-pointer"
            to={`/playlist/${playlist.id}`}
          >
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
            />
            <div className="mt-2">{playlist.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Profile
