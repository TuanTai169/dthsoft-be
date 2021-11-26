import React from "react"
import { Form, Modal, Button, Row, Col, FloatingLabel } from "react-bootstrap"
import { convertStringToDate } from "../../utils/convertDateTime"
import CustomerForm from "../FormBooking/CustomerForm"
import RoomForm from "../FormBooking/RoomForm"
import ServiceForm from "./../FormBooking/ServiceForm"

function DetailReceiptModal(props) {
  const { show, handlerModalClose, receipt } = props
  const {
    booking,
    paidOut,
    refund,
    status,
    createBy,
    updateBy,
    modeOfPayment,
  } = receipt

  const checkInDateConvert = convertStringToDate(booking.checkInDate)
  const checkOutDateConvert = convertStringToDate(booking.checkOutDate)

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

            <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
              <Col>
                <FloatingLabel
                  controlId="floatingCreateBy"
                  label="CreateBy"
                  className="mb-3"
                >
                  <Form.Control type="text" value={createBy.name} disabled />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingUpdateby"
                  label="Updateby "
                  className="mb-3"
                >
                  <Form.Control type="text" value={updateBy} disabled />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingStatus"
                  label="Status"
                  className="mb-3"
                >
                  <Form.Control type="text" value={status} disabled />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => window.print()}>
              Print
            </Button>
            <Button variant="danger" onClick={handlerModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default DetailReceiptModal
