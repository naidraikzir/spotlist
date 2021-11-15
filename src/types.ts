import { RouteProps } from 'react-router'

export interface AppRouteProps extends RouteProps {
  auth?: boolean
}

export interface Image {
  url: string
}

export interface User {
  id?: string,
  display_name: string,
  images?: Image[]
}

export interface Artist {
  name: string
}

export interface Track {
  id: string,
  name: string,
  artists: Artist[],
  duration_ms: number,
  uri: string
}

export interface TrackPlaylist {
  track: Track
}

export interface TrackPaginated {
  items: TrackPlaylist[],
  total: number
}

export interface Playlist {
  id?: string,
  name: string,
  images: Image[],
  owner: User,
  tracks: TrackPaginated
}
