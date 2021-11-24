import React, { useState } from "react"
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap"
import { useDispatch } from "react-redux"
import usePasswordToggle from "../../hooks/usePasswordToggle"
import { updateProfile } from "../../redux/actions/userAction"

function EditProfileModal(props) {
  const { show, handlerModalClose, user } = props
  const dispatch = useDispatch()

  const [inputType, toggleIcon] = usePasswordToggle()
  const [editUser, setEditUser] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    password: "12345678",
    image: user.image,
  })

  const onChangeNewForm = (event) =>
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    resetAddPostData()
    dispatch(updateProfile(editUser, user._id))
  }

  const resetAddPostData = () => {
    handlerModalClose()
    setEditUser({
      name: user.name,
      phone: user.phone,
      address: user.address,
      password: "12345678",
      image: user.image,
    })
  }

  const { name, phone, address, password } = editUser

  return (
    <div>
      <Modal show={show} onHide={resetAddPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name || ""}
                onChange={onChangeNewForm}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="email"
                name="email"
                value={user.email}
                onChange={onChangeNewForm}
                disabled
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPass"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type={inputType}
                placeholder="*"
                name="password"
                value={password}
                onChange={onChangeNewForm}
                required
              />
              <span className="password-toggle-icon">{toggleIcon}</span>
              <Form.Text className="text-muted">
                Password must be 8-20 characters
              </Form.Text>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPhone"
              label="Phone"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={phone || ""}
                onChange={onChangeNewForm}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                name="address"
                placeholder="Address"
                value={address || ""}
                onChange={onChangeNewForm}
                required
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="danger" onClick={resetAddPostData}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default EditProfileModal
