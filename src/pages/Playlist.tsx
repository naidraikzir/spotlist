import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactModal from 'react-modal'
import api from '@/api'
import { Playlist, User } from '@/types'

function PlaylistPage() {
  const localMe = localStorage.getItem('me')
  const me: User = localMe ? JSON.parse(localMe) : {}
  const { id } = useParams()
  const [playlist, setPlaylist] = useState<Playlist>({
    name: '',
    owner: {
      display_name: ''
    },
    images: [],
    tracks: {
      total: 0,
      items: []
    }
  })
  const [deletable, setDeletable] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteUri, setDeleteUri] = useState('')

  async function fetch(id: string) {
    const { data } = await api.playlist(id)
    setPlaylist(data)
    setDeletable(data.owner.id === me.id)
  }

  useEffect(() => {
    if (id) {
      fetch(id)
    }
  }, [])

  function confirmDelete(uri: string) {
    setIsConfirmOpen(true)
    setDeleteUri(uri)
  }

  function resetDelete() {
    setIsConfirmOpen(false)
    setDeleteUri('')
  }

  async function commitDelete() {
    if (id) {
      await api.deletePlaylistItem(id, deleteUri)
      resetDelete()
      fetch(id)
    }
  }

  return (
    <div className="max-w-[1280px] mx-auto pb-8">
      <div className="text-center lg:text-left lg:flex">
        <img
          className="inline-block"
          src={playlist.images.length ? playlist.images[0].url: undefined}
          alt={playlist.name}
          width="180"
        />
        <div className="ml-8 mt-4 lg:mt-auto">
          <div className="text-2xl lg:text-6xl font-bold">{playlist.name}</div>
          <div className="mt-2">
            {playlist.owner.display_name}
            <span className="mx-4">—</span>
            {playlist.tracks.total} tracks
          </div>
        </div>
      </div>

      <div className="mt-12">
        {playlist.tracks.items.map((item, i) => (
          <div
            className="flex items-center p-4"
            key={i}
          >
            <div className="w-8">{i + 1}</div>
            <div>
              <div>{item.track.name}</div>
              <small>{item.track.artists.map(({ name }) => name).join(', ')}</small>
            </div>
            <div className="ml-auto">{new Date(item.track.duration_ms).toISOString().substring(14, 19)}</div>
            {
              deletable
                ? <div
                    className="w-12 lg:w-24 text-center cursor-pointer"
                    onClick={() => confirmDelete(item.track.uri)}
                  >
                    ❌
                  </div>
                : <div className="w-12 lg:w-24" />
            }
          </div>
        ))}
      </div>

      <ReactModal
        className="w-80 flex flex-col bg-white px-10 py-6"
        overlayClassName="fixed w-full h-full inset-0 bg-black bg-opacity-75 flex items-center justify-center transition"
        isOpen={isConfirmOpen}
        onRequestClose={resetDelete}
        shouldFocusAfterRender={false}
        ariaHideApp={false}
      >
        <div className="font-bold text-lg">Are you sure?</div>
        <div className="mt-10 ml-auto">
          <button
            className="font-bold py-2 px-4"
            onClick={resetDelete}
          >
            No
          </button>
          <button
            className="bg-red-600 text-white font-bold py-2 px-4 ml-4"
            onClick={commitDelete}
          >
            Yes
          </button>
        </div>
      </ReactModal>
    </div>
  )
}

export default PlaylistPage
