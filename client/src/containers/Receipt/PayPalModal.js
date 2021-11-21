import React from "react"
import { Modal, Button } from "react-bootstrap"
import PayPal from "./PayPal"

const PayPalModal = (props) => {
  const { open, closeModal, receipt, closeAllModal } = props
  return (
    <>
      <Modal show={open} onHide={closeModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Payment by PayPal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PayPal receipt={receipt} closeAllModal={closeAllModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PayPalModal
