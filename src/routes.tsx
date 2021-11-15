import { AppRouteProps } from '@/types'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import Playlist from '@/pages/Playlist'

const routes: AppRouteProps[] = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/profile',
    element: <Profile />,
    auth: true
  },
  {
    path: '/playlist/:id',
    element: <Playlist />,
    auth: true
  },
  {
    path: '*',
    element: <Login />
  }
]

export default routes
