import React, { useState } from "react"
import "./forgot-password.css"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import { Form, FloatingLabel, Button } from "react-bootstrap"
function ForgotPassword() {
  const [email, setEmail] = useState("")

  return (
    <div className="login-page">
      <div className="company-logo">
        <Link to="/">
          <img src={logo} alt="company logo" />
        </Link>
      </div>
      <div className="forgot-title">Forgot Your Password</div>
      <FloatingLabel
        controlId="floatingEmail"
        label="Enter your email"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FloatingLabel>
      <Button className="login-btn-submit">Verify your email</Button>
    </div>
  )
}

export default ForgotPassword
