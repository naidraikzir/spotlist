import { Navigate, RouteProps } from 'react-router'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import Playlist from '@/pages/Playlist'

export interface AppRouteProps extends RouteProps {
  auth?: boolean
}

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
