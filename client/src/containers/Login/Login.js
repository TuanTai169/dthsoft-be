import "./login.css"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions/authAction"
import { Spinner } from "react-bootstrap"
import { Redirect } from "react-router"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const authLoading = useSelector((state) => state.auth.authLoading)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )
  else if (isAuthenticated) return <Redirect to="/" />
  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
