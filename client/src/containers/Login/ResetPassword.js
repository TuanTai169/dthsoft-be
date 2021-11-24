import React, { useState } from "react"
import { useNavigate, useParams } from "react-router"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import { Form, FloatingLabel, Button } from "react-bootstrap"
import _ from "lodash"
import { toast } from "react-toastify"
import axios from "axios"
import { HOST_API_URL } from "../../redux/constants/api"
import usePasswordToggle from "./../../hooks/usePasswordToggle"

const ResetPassword = () => {
  const [inputType, toggleIcon] = usePasswordToggle()
  const [data, setData] = useState({
    password: "",
    conformPassword: "",
  })

  const { token } = useParams()
  const navigate = useNavigate()

  const onChangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handlerResetPass = async () => {
    if (_.size(password) < 8)
      return toast.error("Password must be at least 8 characters")

    if (_.isEqual(password, conformPassword) === false)
      return toast.error("Password did not match")
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
  const { password, conformPassword } = data

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
        <Form.Text className="text-muted">
          Password must be 8-20 characters
        </Form.Text>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingConformPass"
        label="Conform Password"
        className="mb-3"
      >
        <Form.Control
          type={inputType}
          placeholder="*"
          name="conformPassword"
          value={conformPassword}
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
