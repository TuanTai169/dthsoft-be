import React, { useState } from "react"
import "./forgot-password.css"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import { Form, FloatingLabel, Button } from "react-bootstrap"
const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [conformPassword, setConformPassword] = useState("")

  return (
    <div className="login-page">
      <div className="company-logo">
        <Link to="/">
          <img src={logo} alt="company logo" />
        </Link>
      </div>
      <div className="forgot-title">Reset Password</div>
      <FloatingLabel controlId="floatingPass" label="Password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="*"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingConformPass"
        label="Conform Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="*"
          name="conform password"
          value={conformPassword}
          onChange={(e) => setConformPassword(e.target.value)}
          required
        />
      </FloatingLabel>

      <Button className="login-btn-submit">Reset Password</Button>
    </div>
  )
}

export default ResetPassword
