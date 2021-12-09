import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap"
import DatePicker from "react-datepicker"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"

import CustomerForm from "../FormBooking/CustomerForm"
import { addBooking } from "../../redux/actions/bookingAction"
import ViewAllRoomModal from "../Room/ViewAllRoomModal"
import { numberValidation } from "../../utils/validation"

const CheckInModal = (props) => {
  const { show, handlerModalClose, handlerParentModalClose, currentRoom } =
    props
  const dispatch = useDispatch()
  let navigate = useNavigate()

  //Get info by redux
  const listCustomer = useSelector((state) => state.customerReducer.customers)
  const listRoom = useSelector((state) => state.roomReducer.rooms)
  const listService = useSelector((state) => state.serviceReducer.services)

  // useState
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(
    startDate.getTime() + 12 * 60 * 60 * 1000
  )
  const [customer, setCustomer] = useState({})
  const [arrayRoom, setArrayRoom] = useState(
    listRoom
      .filter((room) => room.status === "READY" && room._id !== currentRoom._id)
      .sort((a, b) => (a.roomNumber < b.roomNumber ? -1 : 1))
  )
  const [rooms, setRooms] = useState([currentRoom])
  const [services, setServices] = useState([])
  const [arrayService, setArrayService] = useState(
    listService.map((service) => service)
  )
  const [totalPrice, setTotalPrice] = useState(currentRoom.price)

  const [newBooking, setNewBooking] = useState({
    checkInDate: moment(startDate).format("YYYY-MM-DD HH:mm"),
    checkOutDate: moment(endDate).format("YYYY-MM-DD HH:mm"),
    deposit: 0,
    discount: 0,
    rooms: [currentRoom._id],
    customer: "",
    services: [],
  })
  const [openViewRoom, setOpenViewRoom] = useState(false)

  //

  useEffect(() => {
    const { checkInDate, checkOutDate, deposit, discount } = newBooking

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

      const sumServicesPrice = services
        .map((item) => item.price)
        .reduce((prev, curr) => prev + curr, 0)

      const VAT = 10
      return (
        (sumRoomsPrice * dayDiff + sumServicesPrice) *
          (1 + VAT / 100 - discount / 100) -
        deposit
      ).toFixed()
    }
    setTotalPrice(calculatorPrice)
  }, [newBooking, rooms, services])

  // Handler
  const handlerCustomer = () => {
    navigate("/customers")
  }
  const handlerService = () => {
    navigate("/services")
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    if (
      numberValidation(newBooking.discount) &&
      numberValidation(newBooking.deposit)
    ) {
      dispatch(addBooking(newBooking, "check-in"))
      resetDataBooking()
    }
  }

  const closeViewRoomModal = () => setOpenViewRoom(false)

  const resetDataBooking = () => {
    handlerParentModalClose()
    handlerModalClose()
    setArrayRoom({
      checkInDate: moment(startDate).format("YYYY-MM-DD HH:mm"),
      checkOutDate: moment(endDate).format("YYYY-MM-DD HH:mm"),
      deposit: 0,
      discount: 0,
      rooms: [currentRoom._id],
      customer: "",
      services: [],
    })
  }

  //onChange
  const onChangeCustomer = (selectCustomer) => {
    setCustomer(selectCustomer)
    setNewBooking({
      ...newBooking,
      customer: selectCustomer._id,
    })
  }

  const onChangeRoom = (selectRoom) => {
    let newArrayRoom = [...rooms, selectRoom]
    setRooms(newArrayRoom)
    setArrayRoom(arrayRoom.filter((room) => room._id !== selectRoom._id))
    setNewBooking({
      ...newBooking,
      rooms: newArrayRoom.map((room) => room._id),
    })
  }

  const onRemoveRoom = (e, selectRoom) => {
    e.preventDefault()

    let newArrayRoom = rooms.filter((room) => room._id !== selectRoom._id)

    setRooms(newArrayRoom)
    setArrayRoom(
      [...arrayRoom, selectRoom].sort((a, b) =>
        a.roomNumber < b.roomNumber ? -1 : 1
      )
    )
    setNewBooking({
      ...newBooking,
      rooms: newArrayRoom.map((room) => room._id),
    })
  }

  const onChangeService = (selectService) => {
    let newArrayService = [...services, selectService]
    setServices(newArrayService)
    setArrayService(
      arrayService.filter((service) => service._id !== selectService._id)
    )
    setNewBooking({
      ...newBooking,
      services: newArrayService.map((service) => service._id),
    })
  }

  const onRemoveService = (e, selectService) => {
    e.preventDefault()

    let newArrayService = services.filter(
      (service) => service._id !== selectService._id
    )
    setServices(newArrayService)
    setArrayService([...arrayService, selectService])
    setNewBooking({
      ...newBooking,
      services: newArrayService.map((service) => service._id),
    })
  }

  //Render room Table
  const tableRoomHead = ["No#", "Number", "Floor", "Type", "Price (USD)", ""]
  const renderRoomHead = tableRoomHead.map((item, index) => {
    return (
      <th key={index} style={{ fontWeight: 500 }}>
        {item}
      </th>
    )
  })

  //Render Service Table
  const tableServiceHead = ["No#", "Name", "Price (USD)"]
  const renderServiceHead = tableServiceHead.map((item, index) => {
    return (
      <th key={index} style={{ fontWeight: 500 }}>
        {item}
      </th>
    )
  })

  const { deposit, discount } = newBooking
  return (
    <>
      <Modal show={show} onHide={resetDataBooking} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Booking</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCheckIn">
                <Form.Label>Check in</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date)
                    setNewBooking({
                      ...newBooking,
                      checkInDate: moment(date).format("YYYY-MM-DD HH:mm"),
                    })
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="dd/MM/yyyy HH:mm"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCheckOut">
                <Form.Label>Check out</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date)
                    setNewBooking({
                      ...newBooking,
                      checkOutDate: moment(date).format("YYYY-MM-DD HH:mm"),
                    })
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="dd/MM/yyyy HH:mm"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDiscount">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={discount}
                  onChange={(e) => {
                    setNewBooking({ ...newBooking, discount: e.target.value })
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDeposit">
                <Form.Label>Deposit</Form.Label>
                <Form.Control
                  type="number"
                  value={deposit}
                  onChange={(e) => {
                    setNewBooking({ ...newBooking, deposit: e.target.value })
                  }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col sm={3}>
                <h5>Customer</h5>
              </Col>
              <Col sm={6}>
                <Select
                  options={listCustomer}
                  onChange={onChangeCustomer}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.name}
                />
              </Col>
              <Col sm={3}>
                <Button variant="success" onClick={handlerCustomer}>
                  Add Customer
                </Button>
              </Col>
              <CustomerForm customer={customer} />
            </Row>
            <Row>
              <Col sm={3}>
                <h5>Room</h5>
              </Col>
              <Col sm={6}>
                <Select
                  options={arrayRoom}
                  onChange={onChangeRoom}
                  getOptionLabel={(option) => option.roomNumber}
                  getOptionValue={(option) => option.roomNumber}
                />
              </Col>
              <Col sm={3}>
                <Button onClick={() => setOpenViewRoom(true)}>
                  View All Room
                </Button>
              </Col>
              <Table striped>
                <thead>
                  <tr>{renderRoomHead}</tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr key={room._id}>
                      <td>{index + 1}</td>
                      <td>{room.roomNumber}</td>
                      <td>{room.floor}</td>
                      <td>{room.roomType}</td>
                      <td>{room.price}</td>

                      <td>
                        <button
                          onClick={(e) => onRemoveRoom(e, room)}
                          className="btn-remove"
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ViewAllRoomModal
                show={openViewRoom}
                handlerModalClose={closeViewRoomModal}
                roomChoose={currentRoom}
                getRoom={onChangeRoom}
              />
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
              <Table striped>
                <thead>
                  <tr>{renderServiceHead}</tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service._id}>
                      <td>{index + 1}</td>
                      <td>{service.name}</td>
                      <td>{service.price}</td>
                      <td>
                        <button
                          onClick={(e) => onRemoveService(e, service)}
                          className="btn-remove"
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
            <p>
              Total Price (USD):{" "}
              <strong style={{ color: "red", fontSize: "20px" }}>
                {totalPrice > 0 ? totalPrice : 0}
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

export default CheckInModal
