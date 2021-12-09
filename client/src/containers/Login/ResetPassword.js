import React, { useState } from "react"
import { useNavigate, useParams } from "react-router"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import { Form, FloatingLabel, Button } from "react-bootstrap"
import { toast } from "react-toastify"
import axios from "axios"
import { HOST_API_URL } from "../../redux/constants/api"
import usePasswordToggle from "./../../hooks/usePasswordToggle"
import {
  passwordValidation,
  matchPasswordValidation,
} from "../../utils/validation"

const ResetPassword = () => {
  const [inputType, toggleIcon] = usePasswordToggle()
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  })

  const { token } = useParams()
  const navigate = useNavigate()

  const onChangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handlerResetPass = async () => {
    if (
      passwordValidation(password) &&
      matchPasswordValidation(password, confirmPassword)
    ) {
      try {
        const res = await axios.post(
          `${HOST_API_URL}/auth/reset-password/${token}`,
          {
            password,
          }
        )
        navigate("/login")
        return toast.success(res.data.message)
      } catch (err) {
        err.response.data.message && toast.error(err.response.data.message)
      }
    }
  }
  const { password, confirmPassword } = data

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
          type={inputType}
          placeholder="*"
          name="password"
          value={password}
          onChange={onChangeData}
          required
        />
        <span className="password-toggle-icon">{toggleIcon}</span>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingConformPass"
        label="Confirm Password"
        className="mb-3"
      >
        <Form.Control
          type={inputType}
          placeholder="*"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeData}
          required
        />
      </FloatingLabel>

      <Button className="login-btn-submit" onClick={handlerResetPass}>
        Reset Password
      </Button>
    </div>
  )
}

export default ResetPassword
