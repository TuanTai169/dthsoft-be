import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import CustomerForm from "../FormBooking/CustomerForm"
import RoomForm from "../FormBooking/RoomForm"
import ServiceForm from "../FormBooking/ServiceForm"
import { convertStringToDate } from "../../utils/convertDateTime"
import { updateBooking } from "./../../redux/actions/bookingAction"

const EditBookingModal = (props) => {
  const { show, handlerModalClose, handlerParentModalClose, booking } = props

  const {
    _id,
    code,
    checkInDate,
    checkOutDate,
    customer,
    rooms,
    services,
    deposit,
    discount,
    roomCharge,
    totalPrice,
    status,
  } = booking[0]

  const [editBooking, setEditBooking] = useState({
    _id: _id,
    rooms: rooms.map((room) => room._id),
    customer: customer._id,
    checkInDate: moment(checkInDate).format("YYYY-MM-DD HH:mm"),
    checkOutDate: moment(checkOutDate).format("YYYY-MM-DD HH:mm"),
    services: services,
    deposit: deposit,
    discount: discount,
    status: status,
  })

  const dispatch = useDispatch()
  let navigate = useNavigate()

  //Get info by redux
  const listService = useSelector((state) => state.serviceReducer.services)

  const [newServices, setNewServices] = useState(services)

  const [arrayService, setArrayService] = useState(
    listService.map((service) => service)
  )

  const [sumPrice, setSumPrice] = useState(totalPrice)

  // useEffect
  useEffect(() => {
    const { checkInDate, checkOutDate, deposit, discount } = editBooking
    //Calculator
    const calculatorDayDiff = () => {
      const start = moment(checkInDate, "YYYY-MM-DD HH:mm")
      const end = moment(checkOutDate, "YYYY-MM-DD HH:mm")

      //Difference in number of days
      const dayDiff =
        Math.round(moment.duration(end.diff(start)).asDays()) < 1
          ? 1
          : Math.round(moment.duration(end.diff(start)).asDays())

      return dayDiff
    }

    const calculatorPrice = () => {
      const dayDiff = calculatorDayDiff()

      const sumRoomsPrice = rooms
        .map((item) => item.price)
        .reduce((prev, curr) => prev + curr, 0)

      const sumServicesPrice = newServices
        .map((item) => item.price)
        .reduce((prev, curr) => prev + curr, 0)

      const VAT = 10
      return (
        (sumRoomsPrice * dayDiff + sumServicesPrice) *
          (1 + VAT / 100 - discount / 100) -
        deposit
      ).toFixed()
    }
    setSumPrice(calculatorPrice)
  }, [editBooking, rooms, newServices])

  // Handler

  const handlerService = () => {
    navigate("/services")
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    console.log(editBooking)
    dispatch(updateBooking(editBooking))
    resetDataBooking()
  }

  const resetDataBooking = () => {
    handlerParentModalClose()
    handlerModalClose()
    setEditBooking(booking[0])
  }

  const onChangeService = (selectService) => {
    let newArrayService = [...newServices, selectService]
    setNewServices(newArrayService)
    setArrayService(
      arrayService.filter((service) => service._id !== selectService._id)
    )
    setEditBooking({
      ...editBooking,
      services: newArrayService.map((service) => service._id),
    })
  }

  const checkInDateConvert = convertStringToDate(checkInDate)
  const checkOutDateConvert = convertStringToDate(checkOutDate)

  return (
    <>
      <Modal show={show} onHide={resetDataBooking} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit {code}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          <Modal.Body>
            <Row>
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
                  <Form.Control type="text" value={discount} disabled />
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
            <Row>
              <Col sm={3}>
                <h5>Service</h5>
              </Col>
              <Col sm={6}>
                <Select
                  options={arrayService}
                  onChange={onChangeService}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.name}
                />
              </Col>
              <Col sm={3}>
                <Button
                  variant="warning"
                  style={{ color: "#fff" }}
                  onClick={handlerService}
                >
                  View All Service
                </Button>
              </Col>
              <ServiceForm services={newServices} />
            </Row>
            <p>
              Total Price:{" "}
              <strong style={{ color: "red", fontSize: "20px" }}>
                {sumPrice > 0 ? sumPrice : 0}
              </strong>{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" type="submit">
              Save
            </Button>
            <Button variant="secondary" onClick={resetDataBooking}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditBookingModal
