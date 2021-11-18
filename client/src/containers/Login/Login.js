import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions/authAction"
import { Spinner, Form, FloatingLabel, Button } from "react-bootstrap"
import { Redirect } from "react-router"
import { Link } from "react-router-dom"
import logo from "../../assets/images/logo.png"

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
      <div className="company-logo">
        <img src={logo} alt="company-logo" />
      </div>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
          <Form.Control
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPass"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="*"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FloatingLabel>

        <Button className="login-btn-submit" type="submit">
          Login
        </Button>
        <div style={{ marginTop: "12px" }}>
          <Link to="/forgot_password">Forgot your password?</Link>
        </div>
      </Form>
    </div>
  )
}

export default Login
