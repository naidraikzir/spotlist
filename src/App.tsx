import { Routes, Route, Navigate } from 'react-router'
import routes, { AppRouteProps } from '@/routes'

function RequireAuth({ children, auth }) {
  return auth && !localStorage.getItem('access_token')
    ? <Navigate to="/" />
    : children
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
