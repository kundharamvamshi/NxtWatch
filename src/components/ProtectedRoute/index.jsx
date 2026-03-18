import Cookies from 'js-cookie'
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
    return <Navigate to="/login" replace />
  }

  return children ?? <Outlet />
}

export default ProtectedRoute
