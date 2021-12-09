import React from "react"
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap"

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
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                required
                readOnly
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPrice"
              label="Price"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="0"
                name="price"
                value={price}
                required
                readOnly
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

export default DetailServiceModal
