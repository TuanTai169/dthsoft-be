import React, { useState } from "react"
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { convertStringToDate } from "../../utils/convertDateTime"
import CustomerForm from "../FormBooking/CustomerForm"
import RoomForm from "../FormBooking/RoomForm"
import ServiceForm from "./../FormBooking/ServiceForm"
import { checkOut } from "../../redux/actions/receiptAction"
import PayPalModal from "./PayPalModal"
import FullLoading from "./../../components/Common/FullLoading/FullLoading"

const CheckOutModal = (props) => {
  const { show, handlerModalClose, handlerParentModalClose, booking } = props

  const isLoading = useSelector(
    (state) => state.receiptReducer.isReceiptLoading
  )

  const {
    _id,
    code,
    customer,
    rooms,
    checkInDate,
    checkOutDate,
    deposit,
    discount,
    services,
    roomCharge,
    serviceCharge,
    VAT,
    totalPrice,
  } = booking[0]
  const dispatch = useDispatch()
  const [receipt, setReceipt] = useState({
    booking: _id,
    paidOut: "0",
    refund: 0,
    modeOfPayment: "CASH",
  })
  const [isPaypal, setIsPaypal] = useState(false)

  const checkInDateConvert = convertStringToDate(checkInDate)
  const checkOutDateConvert = convertStringToDate(checkOutDate)

  const onChangePaidOut = (e) => {
    setReceipt({
      ...receipt,
      paidOut: e.target.value,
      refund: e.target.value > totalPrice ? e.target.value - totalPrice : 0,
    })
  }

  const onSubmitCheckOut = () => {
    const newReceipt = {
      ...receipt,
      paidOut: parseInt(receipt.paidOut),
    }
    dispatch(checkOut(newReceipt))
    resetData()
  }
  const resetData = () => {
    setReceipt({
      booking: _id,
      paidOut: "0",
      refund: 0,
      modeOfPayment: "CASH",
    })
    handlerModalClose()
    handlerParentModalClose()
  }

  const { paidOut, refund, modeOfPayment } = receipt
  return (
    <>
      {isLoading ? (
        <FullLoading />
      ) : (
        <Modal
          show={show}
          onHide={handlerModalClose}
          animation={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{code}</Modal.Title>
            <div style={{ marginLeft: "30%", fontSize: "20px" }}>
              Total Price (USD):{" "}
              <strong style={{ color: "red", fontSize: "20px" }}>
                {totalPrice}
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
                    <Form.Control type="number" value={discount} disabled />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingDeposit"
                    label="Deposit (USD)"
                    className="mb-3"
                  >
                    <Form.Control type="text" value={deposit} disabled />
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
                    <Form.Control
                      type="number"
                      value={paidOut}
                      onChange={onChangePaidOut}
                    />
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
                    <Form.Control type="text" value={VAT} readOnly />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingModeOfPayment"
                    label="Mode Of Payment"
                    className="mb-3"
                  >
                    <Form.Select
                      name="modeOfPayment"
                      value={modeOfPayment}
                      onChange={(e) =>
                        setReceipt({
                          ...receipt,
                          modeOfPayment: e.target.value,
                        })
                      }
                      required
                    >
                      <option>--</option>
                      <option value="CASH">CASH</option>
                      <option value="PAYPAL">PAYPAL</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
                <Form.Group controlId="formGridCustomer">
                  <h5>Customer</h5>
                  <CustomerForm customer={customer} />
                </Form.Group>
              </Row>
              <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
                <Form.Group controlId="formGridRoom">
                  <div className="form-label">
                    <h5>Room</h5>
                    <p>
                      Price (USD):{" "}
                      <strong style={{ color: "red" }}>{roomCharge}</strong>
                    </p>
                  </div>
                  <RoomForm rooms={rooms} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridService">
                  <div className="form-label">
                    <h5>Service</h5>
                    <p>
                      Price (USD):{" "}
                      <strong style={{ color: "red" }}>{serviceCharge}</strong>
                    </p>
                  </div>
                  <ServiceForm services={services} />
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              {isPaypal ? (
                <PayPalModal
                  open={isPaypal}
                  closeModal={() => setIsPaypal(false)}
                  receipt={receipt}
                  closeAllModal={resetData}
                />
              ) : (
                <Button onClick={() => setIsPaypal(true)}>PayPal</Button>
              )}
              <Button variant="danger" onClick={onSubmitCheckOut}>
                Save
              </Button>
              <Button variant="secondary" onClick={handlerModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default CheckOutModal
