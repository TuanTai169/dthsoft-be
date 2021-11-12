import React, { useState } from "react"
import { Form, Modal, Button, Row, Col, FloatingLabel } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateCustomer } from "../../redux/actions/customerAction"
import { convertBirthDate } from "../../utils/convertDateTime"

function EditCustomerModal(props) {
  const { show, handlerModalClose, customer } = props
  const dispatch = useDispatch()
  const changeBirthDate = convertBirthDate(customer.birthDate)

  const [editCustomer, setEditCustomer] = useState({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    gender: customer.gender,
    address: customer.address,
    cmnd: customer.cmnd,
    birthDate: changeBirthDate,
    note: customer.note,
  })

  const onChangeNewForm = (event) =>
    setEditCustomer({
      ...editCustomer,
      [event.target.name]: event.target.value,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    resetAddPostData()
    dispatch(updateCustomer(editCustomer, customer._id))
    console.log(editCustomer)
  }

  const resetAddPostData = () => {
    handlerModalClose()
    setEditCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      gender: customer.gender,
      address: customer.address,
      cmnd: customer.cmnd,
      birthDate: changeBirthDate,
      note: customer.note,
    })
  }
  const { name, email, phone, gender, address, cmnd, birthDate, note } =
    editCustomer

  return (
    <div>
      <Modal show={show} onHide={resetAddPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
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
                disabled
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
    </div>
  )
}

export default EditCustomerModal
