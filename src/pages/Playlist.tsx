import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactModal from 'react-modal'
import api from '@/api'

function Playlist() {
  const me = JSON.parse(localStorage.getItem('me'))
  const { id } = useParams()
  const [playlist, setPlaylist] = useState({
    owner: {},
    images: [],
    tracks: {
      items: []
    }
  })
  const [deletable, setDeletable] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteUri, setDeleteUri] = useState(null)

  async function fetch() {
    const { data } = await api.playlist(id)
    setPlaylist(data)
    setDeletable(data.owner.id === me.id)
  }

  useEffect(() => {
    fetch()
  }, [])

  function confirmDelete(uri) {
    setIsConfirmOpen(true)
    setDeleteUri(uri)
  }

  function resetDelete() {
    setIsConfirmOpen(false)
    setDeleteUri(null)
  }

  async function commitDelete() {
    await api.deletePlaylistItem(id, deleteUri)
    resetDelete()
    fetch()
  }

  return (
    <div className="max-w-[1280px] mx-auto pb-8">
      <div className="flex">
        <img
          src={playlist.images.length && playlist.images[0].url}
          alt={playlist.name}
          width="180"
        />
        <div className="ml-8 mt-auto">
          <div className="text-7xl font-bold">{playlist.name}</div>
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
            <div className="ml-auto">{new Date(item.track.duration_ms).toISOString().substr(14, 5)}</div>
            {
              deletable
                ? <div
                    className="w-24 text-center cursor-pointer"
                    onClick={() => confirmDelete(item.track.uri)}
                  >
                    ❌
                  </div>
                : <div className="w-24" />
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

export default Playlist
