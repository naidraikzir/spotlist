import { Routes, Route, Navigate } from 'react-router'
import routes from '@/routes'
import { AppRouteProps } from '@/types'
import { ReactComponent as GithubIcon } from '@/assets/github.svg'

function RequireAuth(props: AppRouteProps) {
  return (
    <>
      {props.auth && !localStorage.getItem('access_token')
        ? <Navigate to="/" />
        : props.children
      }
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        {routes.map(route => (
          <Route
            key={route.path}
            {...route}
            element={
              <RequireAuth {...route}>
                {route.element}
              </RequireAuth>
            }
          />
        ))}
      </Routes>

      <div className="flex items-center justify-center py-8">
        <a href="https://github.com/naidraikzir/spotlist" target="_blank" rel="noopener">
          <GithubIcon className="text-5xl" />
        </a>
      </div>
    </div>
  )
}

export default App
