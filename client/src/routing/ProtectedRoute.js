import React from "react"
import { Spinner } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authLoading = useSelector((state) => state.auth.authLoading)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default ProtectedRoute
