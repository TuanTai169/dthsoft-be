import React, { useState } from "react"
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap"
import { useDispatch } from "react-redux"
import usePasswordToggle from "../../hooks/usePasswordToggle"
import { changePassword } from "../../redux/actions/userAction"

const ChangePasswordModal = (props) => {
  const { show, handlerModalClose, user } = props
  const dispatch = useDispatch()

  const [inputType, toggleIcon] = usePasswordToggle()
  const [editUser, setEditUser] = useState({
    oldPassword: "",
    newPassword: "",
    conformPassword: "",
  })

  const onChangeNewForm = (event) =>
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(changePassword(editUser, user._id))
    resetAddPostData()
  }

  const resetAddPostData = () => {
    handlerModalClose()
    setEditUser({
      oldPassword: "",
      newPassword: "",
      conformPassword: "",
    })
  }

  const { oldPassword, newPassword, conformPassword } = editUser

  return (
    <div>
      <Modal show={show} onHide={resetAddPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingPass"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type={inputType}
                placeholder="*"
                name="oldPassword"
                value={oldPassword}
                onChange={onChangeNewForm}
                required
              />
              <span className="password-toggle-icon">{toggleIcon}</span>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPass"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type={inputType}
                placeholder="*"
                name="newPassword"
                value={newPassword}
                onChange={onChangeNewForm}
                required
              />
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
                onChange={onChangeNewForm}
                required
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="secondary" onClick={resetAddPostData}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default ChangePasswordModal
