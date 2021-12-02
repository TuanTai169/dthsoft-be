import React from "react"
import { Form, Modal, Button, Row, Col, FloatingLabel } from "react-bootstrap"
import { convertBirthDate } from "../../utils/convertDateTime"

function DetailCustomerModal(props) {
  const { show, handlerModalClose, customer } = props

  const { name, email, phone, gender, address, cmnd, birthDate, note } =
    customer

  const formatBirthDate = convertBirthDate(birthDate)
  return (
    <>
      <Modal show={show} onHide={handlerModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Customer</Modal.Title>
        </Modal.Header>
        <Form>
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
                required
                disabled
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="email"
                value={email || ""}
                disabled
                required
              />
            </FloatingLabel>

            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingPhone"
                  label="Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    value={phone || ""}
                    disabled
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingCnnd"
                  label="Id Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="cmnd"
                    placeholder="Id Number"
                    value={cmnd || ""}
                    disabled
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
                    value={formatBirthDate || ""}
                    disabled
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
                  <Form.Control
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={gender || ""}
                    disabled
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
                disabled
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
                disabled
                required
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlerModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default DetailCustomerModal
