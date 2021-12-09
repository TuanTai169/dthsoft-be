import React from "react"
import { Form, Modal, Button, Row, Col, FloatingLabel } from "react-bootstrap"

function DetailUserModal(props) {
  const { show, handlerModalClose, user } = props
  const { name, email, phone, address, roles } = user

  return (
    <>
      <Modal show={show} onHide={handlerModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>View {name} </Modal.Title>
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
                readOnly
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
                readOnly
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
                    readOnly
                    required
                  />
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="floatingRoles"
                  label="Roles"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Roles"
                    name="roles"
                    value={roles || ""}
                    readOnly
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

export default DetailUserModal
