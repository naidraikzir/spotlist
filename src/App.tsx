import { Routes, Route, Navigate } from 'react-router'
import routes, { AppRouteProps } from '@/routes'

function App() {
  function isAuth(route: AppRouteProps) {
    if (route.auth && !localStorage.getItem('token')) return <Navigate to="/" />
    return route.element
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {routes.map(route => (
          <Route
            key={route.path}
            {...route}
            element={isAuth(route)}
          />
        ))}
      </Routes>
    </div>
  )
}

export default App
