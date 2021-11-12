import React, { useState } from "react"
import { Form, Modal, FloatingLabel, Button, Row, Col } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addCustomer } from "../../redux/actions/customerAction"

const AddCustomerModal = (props) => {
  const { show, handlerModalClose } = props
  const dispatch = useDispatch()

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cmnd: "",
    gender: "",
    birthDate: "",
    note: "",
  })

  const onChangeNewForm = (event) =>
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    resetAddPostData()
    dispatch(addCustomer(newCustomer))
  }

  const resetAddPostData = () => {
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      cmnd: "",
      gender: "",
      birthDate: "",
      note: "",
    })
    handlerModalClose()
  }

  const { name, email, phone, address, cmnd, gender, birthDate, note } =
    newCustomer
  return (
    <>
      <Modal show={show} onHide={resetAddPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingTextarea"
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
                value={email || ""}
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
                  controlId="floatingCmnd"
                  label="Id Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Id Number"
                    name="cmnd"
                    value={cmnd || ""}
                    onChange={onChangeNewForm}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingBirthDate"
                  label="Date of birth"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    name="birthDate"
                    value={birthDate || ""}
                    onChange={onChangeNewForm}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingGender"
                  label="Gender"
                  className="mb-3"
                >
                  <Form.Select
                    name="gender"
                    value={gender || ""}
                    onChange={onChangeNewForm}
                    required
                  >
                    <option>--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
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
            <FloatingLabel
              controlId="floatingNote"
              label="Note"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                name="note"
                placeholder="Note"
                value={note || ""}
                onChange={onChangeNewForm}
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
    </>
  )
}

export default AddCustomerModal
