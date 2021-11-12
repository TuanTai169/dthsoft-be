import React from "react"
import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import { convertStringToDate } from "../../utils/convertDateTime"
import CustomerForm from "../FormBooking/CustomerForm"
import RoomForm from "../FormBooking/RoomForm"

const ViewDetailBookingModal = (props) => {
  const { show, handlerModalClose, booking } = props

  const {
    code,
    customer,
    rooms,
    checkInDate,
    checkOutDate,
    deposit,
    totalPrice,
  } = booking

  const checkInDateConvert = convertStringToDate(checkInDate)
  const checkOutDateConvert = convertStringToDate(checkOutDate)

  return (
    <>
      <Modal show={show} onHide={handlerModalClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{code}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCheckIn">
                <Form.Label>Check in</Form.Label>
                <Form.Control type="text" value={checkInDateConvert} disabled />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCheckOut">
                <Form.Label>Check out</Form.Label>
                <Form.Control
                  type="text"
                  value={checkOutDateConvert}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDeposit">
                <Form.Label>Deposit</Form.Label>
                <Form.Control type="text" value={deposit} disabled />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formGridCustomer">
                <Form.Label>Customer</Form.Label>
                <CustomerForm customer={customer} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formGridRoom">
                <Form.Label>Room</Form.Label>
                <RoomForm rooms={rooms} />
              </Form.Group>
            </Row>
            <p>
              Total Price:{" "}
              <strong style={{ color: "red", fontSize: "20px" }}>
                ${totalPrice}
              </strong>{" "}
            </p>
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

export default ViewDetailBookingModal
