import React from "react";
import { Form, Modal, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { convertBirthDate } from "../../utils/convertDateTime";

function DetailUserModal(props) {
  const { show, handlerModalClose, user } = props;
  const { name, email, phone, address, image, roles, createdAt, } = user;
  const formatCreatedAt = convertBirthDate(createdAt);

  return (
    <>
      <Modal show={show} onHide={handlerModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>View User {name}</Modal.Title>
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
                  controlId="floatingimage"
                  label="Image"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="Image"
                    value={image || ""}
                    disabled
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingCreatedAt"
                  label="CreatedAt"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    name="createdAt"
                    value={formatCreatedAt || ""}
                    disabled
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handlerModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default DetailUserModal;
