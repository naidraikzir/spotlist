import { Routes, Route, Navigate } from 'react-router'
import routes from '@/routes'
import { AppRouteProps } from '@/types'

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
    </div>
  )
}

export default App
