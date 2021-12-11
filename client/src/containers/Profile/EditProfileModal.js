import React, { useState } from "react"
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateProfile } from "../../redux/actions/userAction"
import {
  phoneValidation,
  nameValidation,
  textValidation,
} from "../../utils/validation"

function EditProfileModal(props) {
  const { show, handlerModalClose, user } = props
  const dispatch = useDispatch()

  const [editUser, setEditUser] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
  })

  const onChangeNewForm = (event) =>
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      nameValidation(editUser.name) &&
      phoneValidation(editUser.phone) &&
      textValidation(editUser.address)
    ) {
      resetAddPostData()
      dispatch(updateProfile(editUser, user._id))
    }
  }

  const resetAddPostData = () => {
    handlerModalClose()
    setEditUser({
      name: user.name,
      phone: user.phone,
      address: user.address,
    })
  }

  const { name, phone, address } = editUser

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
            <Button variant="secondary" onClick={resetAddPostData}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default EditProfileModal
