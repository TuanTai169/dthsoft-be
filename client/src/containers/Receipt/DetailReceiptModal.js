import React, { useState } from "react"
import {
  Form,
  Modal,
  Button,
  ButtonToolbar,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap"
import { convertStringToDate } from "../../utils/convertDateTime"
import CustomerForm from "../FormBooking/CustomerForm"
import RoomForm from "../FormBooking/RoomForm"
import ServiceForm from "./../FormBooking/ServiceForm"
import PrintBill from "./PrintBill"

function DetailReceiptModal(props) {
  const { show, handlerModalClose, receipt } = props
  const { booking, paidOut, refund, modeOfPayment } = receipt

  const checkInDateConvert = convertStringToDate(booking.checkInDate)
  const checkOutDateConvert = convertStringToDate(booking.checkOutDate)

  const [isViewOpen, setIsViewOpen] = useState(false)
  const handlerModalViewClose = () => setIsViewOpen(false)

  //print

  return (
    <>
      <Modal show={show} onHide={handlerModalClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{booking.code}</Modal.Title>
          <div style={{ marginLeft: "30%", fontSize: "20px" }}>
            Total Price (USD):{" "}
            <strong style={{ color: "red", fontSize: "20px" }}>
              {booking.totalPrice}
            </strong>
          </div>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
              <Col>
                <FloatingLabel
                  controlId="floatingCheckIn"
                  label="Check in "
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={checkInDateConvert}
                    disabled
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingCheckOut"
                  label="Check out"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={checkOutDateConvert}
                    disabled
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingDiscount"
                  label="Discount (%)"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    value={booking.discount}
                    disabled
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingDeposit"
                  label="Deposit (USD)"
                  className="mb-3"
                >
                  <Form.Control type="text" value={booking.deposit} disabled />
                </FloatingLabel>
              </Col>
            </Row>
            <Row style={{ borderBottom: "1px solid #bbb" }}>
              <Col>
                <FloatingLabel
                  controlId="floatingPaidOut"
                  label="Paid (USD) "
                  className="mb-3"
                >
                  <Form.Control type="text" value={paidOut} readOnly />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingRefund"
                  label="Refund (USD) "
                  className="mb-3"
                >
                  <Form.Control type="text" value={refund} readOnly />
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="floatingVAT"
                  label="VAT(%) "
                  className="mb-3"
                >
                  <Form.Control type="text" value={booking.VAT} readOnly />
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel
                  controlId="floatingModeOfPayment"
                  label="Mode Of Payment "
                  className="mb-3"
                >
                  <Form.Control type="text" value={modeOfPayment} readOnly />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
              <Form.Group controlId="formGridCustomer">
                <h5>Customer</h5>
                <CustomerForm customer={booking.customer} />
              </Form.Group>
            </Row>
            <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
              <Form.Group controlId="formGridRoom">
                <div className="form-label">
                  <h5>Room</h5>
                  <p>
                    Price (USD):{" "}
                    <strong style={{ color: "red" }}>
                      {booking.roomCharge}
                    </strong>
                  </p>
                </div>
                <RoomForm rooms={booking.rooms} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridService">
                <div className="form-label">
                  <h5>Service</h5>
                  <p>
                    Price (USD):{" "}
                    <strong style={{ color: "red" }}>
                      {booking.serviceCharge}
                    </strong>
                  </p>
                </div>
                <ServiceForm services={booking.services} />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button variant="danger" onClick={() => setIsViewOpen(true)}>
                Print
              </Button>
              <PrintBill
                handlerModalClose={handlerModalViewClose}
                show={isViewOpen}
                receipt={receipt}
              />
            </ButtonToolbar>
            <Button variant="secondary" onClick={handlerModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default DetailReceiptModal
