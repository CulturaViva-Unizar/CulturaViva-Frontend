import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Role } from '../common/constants'

interface ProtectedRouteProps {
  allowedRoles: Role[]
  children?: React.ReactNode
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/inicio-sesion" replace />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/no-autorizado" replace />
  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
