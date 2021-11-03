import React from "react"
import { Form, Modal, Button } from "react-bootstrap"

function DetailServiceModal(props) {
  const { show, handlerModalClose, service } = props

  const { name, price } = service
  return (
    <>
      <Modal show={show} onHide={handlerModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>View Service</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name || ""}
                disabled
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price(VND)</Form.Label>
              <Form.Control
                type="text"
                placeholder="0"
                name="price"
                value={price || ""}
                disabled
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handlerModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default DetailServiceModal
