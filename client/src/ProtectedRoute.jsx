import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return (<h1> Loading ...</h1>)
  if (!isAuthenticated) return <Navigate to='/login' />
  return <Outlet />
}
