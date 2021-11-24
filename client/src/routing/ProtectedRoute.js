import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import FullLoading from "../components/Common/FullLoading/FullLoading"

const ProtectedRoute = ({ children }) => {
  const authLoading = useSelector((state) => state.auth.authLoading)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (authLoading) return <FullLoading />

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
