import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { JSX } from 'react'

interface ProtectedRouteProps {
  children: JSX.Element
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" replace />  // Redirect to login if not auth
  }

  return children  // Render child if auth
}