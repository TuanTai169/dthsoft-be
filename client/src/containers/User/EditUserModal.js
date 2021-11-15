import React, { useState } from "react"
import { Form, Modal, Button, Row, Col, FloatingLabel } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateUser } from "../../redux/actions/userAction"


function EditUserModal(props) {

  const { show, handlerModalClose, user } = props
  const dispatch = useDispatch()

  const [editUser, setEditUser] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
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
    dispatch(updateUser(editUser, user._id))
    console.log(editUser)
  }
  
  const resetAddPostData = () => {
    handlerModalClose()
    setEditUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      image: user.image,
    })
  }

  const { name, email, phone, address, image} = editUser

  return (
    <div>
      <Modal show={show} onHide={resetAddPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User {name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
          <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="email"
                name="email"
                value={email || ""}
                onChange={onChangeNewForm}
                disabled
                required
              />
            </FloatingLabel>

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

            <Row>
              <Col>
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
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingImage"
                  label="Image"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Image"
                    name="image"
                    value={image || ""}
                    onChange={onChangeNewForm}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            
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

export default EditUserModal
