import React, { useState } from "react"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import { Form, FloatingLabel, Button } from "react-bootstrap"
import { toast } from "react-toastify"
import axios from "axios"
import { HOST_API_URL } from "../../redux/constants/api"

function ForgotPassword() {
  const [email, setEmail] = useState("")

  const sendConformEmail = async () => {
    try {
      const res = await axios.post(`${HOST_API_URL}/auth/forgot-password`, {
        email,
      })

      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

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
      <Button className="login-btn-submit" onClick={sendConformEmail}>
        Verify your email
      </Button>
      <div style={{ marginTop: "12px" }}>
        <Link to="/login">
          {" "}
          <i className="bx bx-left-arrow-alt"></i>Login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword
