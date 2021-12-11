import React, { useEffect, useState } from "react"
import moment from "moment"
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import { useDispatch, useSelector } from "react-redux"
import CustomerForm from "../FormBooking/CustomerForm"
import {
  updateBooking,
  getAllBooking,
} from "./../../redux/actions/bookingAction"
import { checkStatusRoom } from "../../utils/validation"
import { numberValidation } from "../../utils/validation"
import { totalRoomCharge } from "./../../utils/calculateRoomPrice"
import DialogChange from "../../components/Dialog/DialogChange"
import ViewAllServiceModal from "../Service/ViewAllServiceModal"

const EditBookingModal = (props) => {
  const { show, handlerModalClose, booking } = props

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
    serviceCharge,
    totalPrice,
    status,
  } = booking

  const dispatch = useDispatch()

  //Get info by redux
  const listCustomer = useSelector((state) => state.customerReducer.customers)
  const listRoom = useSelector((state) => state.roomReducer.rooms)
  const listService = useSelector((state) => state.serviceReducer.services)
  const listBooking = useSelector((state) => state.bookingReducer.bookings)

  // USE STATE
  const [startDate, setStartDate] = useState(new Date(checkInDate))
  const [endDate, setEndDate] = useState(new Date(checkOutDate))
  const [excludeDates, setExcludeDates] = useState([])

  const [newCustomer, setCustomer] = useState(customer)
  const [arrayRoom, setArrayRoom] = useState(
    listRoom
      .filter((room) => room.status === "READY")
      .sort((a, b) => (a.roomNumber < b.roomNumber ? -1 : 1))
  )
  const [newRooms, setRooms] = useState(rooms)
  const [newServices, setNewServices] = useState(services)
  const [arrayService, setArrayService] = useState(
    listService.map((service) => service)
  )

  const [sumPrice, setSumPrice] = useState(totalPrice)
  const [roomPrice, setRoomPrice] = useState(roomCharge)
  const [servicePrice, setServicePrice] = useState(serviceCharge)

  const [editBooking, setEditBooking] = useState({
    _id: _id,
    rooms: rooms.map((room) => room._id),
    customer: customer._id,
    checkInDate: moment(startDate).format("YYYY-MM-DD HH:mm"),
    checkOutDate: moment(endDate).format("YYYY-MM-DD HH:mm"),
    services: services,
    deposit: deposit,
    discount: discount,
    status: status,
  })
  const [conformDialog, setConformDialog] = useState({
    isOpenDialog: false,
    title: "",
    message: "",
  })
  const [openViewService, setOpenViewService] = useState(false)

  // useEffect
  useEffect(() => {
    const { checkInDate, checkOutDate, deposit, discount } = editBooking

    const checkExcludeDate = checkStatusRoom(newRooms, listBooking)
    const exclude = checkExcludeDate.map((item) => new Date(item))
    setExcludeDates(exclude)

    const calculatorPrice = () => {
      const RoomCharge = totalRoomCharge(newRooms, checkInDate, checkOutDate)
      const sumServicesPrice = newServices
        .map((item) => item.price)
        .reduce((prev, curr) => prev + curr, 0)

      setRoomPrice(RoomCharge)
      setServicePrice(sumServicesPrice)
      const VAT = 10
      return (
        (RoomCharge + sumServicesPrice) * (1 + VAT / 100 - discount / 100) -
        deposit
      ).toFixed()
    }

    setSumPrice(calculatorPrice)
  }, [editBooking, newRooms, newServices, listBooking])

  // Handler

  const handlerSubmit = (e) => {
    e.preventDefault()
    if (
      numberValidation(editBooking.discount) &&
      numberValidation(editBooking.deposit)
    ) {
      dispatch(updateBooking(editBooking))
      setTimeout(() => dispatch(getAllBooking()), 3000)
      resetDataBooking()
    }
  }

  const resetDataBooking = () => {
    handlerModalClose()
    setEditBooking(booking)
  }

  const handlerCheckIn = () => {
    dispatch(updateBooking({ ...editBooking, status: "CHECK IN" }))
    setTimeout(() => dispatch(getAllBooking()), 3000)
    handlerModalClose()
  }
  const closeViewServiceModal = () => setOpenViewService(false)

  //onChange
  const onChangeCustomer = (selectCustomer) => {
    setCustomer(selectCustomer)
    setEditBooking({
      ...editBooking,
      customer: selectCustomer._id,
    })
  }

  const onChangeRoom = (selectRoom) => {
    let newArrayRoom = [...newRooms, selectRoom]
    setRooms(newArrayRoom)
    setArrayRoom(arrayRoom.filter((room) => room._id !== selectRoom._id))
    setEditBooking({
      ...editBooking,
      rooms: newArrayRoom.map((room) => room._id),
    })
  }

  const onRemoveRoom = (e, selectRoom) => {
    e.preventDefault()

    let newArrayRoom = newRooms.filter((room) => room._id !== selectRoom._id)

    setRooms(newArrayRoom)
    setArrayRoom(
      [...arrayRoom, selectRoom].sort((a, b) =>
        a.roomNumber < b.roomNumber ? -1 : 1
      )
    )
    setEditBooking({
      ...editBooking,
      rooms: newArrayRoom.map((room) => room._id),
    })
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

  const onRemoveService = (e, selectService) => {
    e.preventDefault()

    let newArrayService = newServices.filter(
      (service) => service._id !== selectService._id
    )
    setNewServices(newArrayService)
    setArrayService([...arrayService, selectService])
    setEditBooking({
      ...editBooking,
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

  return (
    <>
      <Modal show={show} onHide={resetDataBooking} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit {code}</Modal.Title>
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
                    setEditBooking({
                      ...editBooking,
                      checkInDate: moment(date).format("YYYY-MM-DD HH:mm"),
                    })
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  excludeDates={excludeDates}
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
                    setEditBooking({
                      ...editBooking,
                      checkOutDate: moment(date).format("YYYY-MM-DD HH:mm"),
                    })
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  excludeDates={excludeDates}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="dd/MM/yyyy HH:mm"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDiscount">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={editBooking.discount}
                  onChange={(e) => {
                    setEditBooking({ ...editBooking, discount: e.target.value })
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDeposit">
                <Form.Label>Deposit</Form.Label>
                <Form.Control
                  type="number"
                  value={editBooking.deposit}
                  onChange={(e) => {
                    setEditBooking({ ...editBooking, deposit: e.target.value })
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
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
              <CustomerForm customer={newCustomer} />
            </Row>
            <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
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
              <Table striped>
                <thead>
                  <tr>{renderRoomHead}</tr>
                </thead>
                <tbody>
                  {newRooms.map((room, index) => (
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
              <p>
                Room Price (USD):{" "}
                <strong style={{ color: "red" }}>{roomPrice}</strong>
              </p>
            </Row>
            <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
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
                  onClick={() => setOpenViewService(true)}
                >
                  Add New Service
                </Button>
              </Col>
              <Table striped>
                <thead>
                  <tr>{renderServiceHead}</tr>
                </thead>
                <tbody>
                  {newServices.map((service, index) => (
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
              <ViewAllServiceModal
                show={openViewService}
                handlerModalClose={closeViewServiceModal}
                getService={onChangeService}
              />
              <p>
                Service Price (USD):{" "}
                <strong style={{ color: "red" }}>{servicePrice}</strong>
              </p>
            </Row>
            <div>
              Total Price (USD):{" "}
              <strong style={{ color: "red", fontSize: "20px" }}>
                {sumPrice}
              </strong>{" "}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              style={{ marginLeft: "4px" }}
              onClick={() => {
                setConformDialog({
                  isOpenDialog: true,
                  title: "CheckIn",
                  message: "Are you sure check in this booking?",
                  onConform: () => handlerCheckIn(),
                })
              }}
            >
              <i className="bx bxs-user-check"></i>
              <span>&ensp;Check in</span>
            </Button>
            <DialogChange
              conformDialog={conformDialog}
              setConformDialog={setConformDialog}
            />
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
