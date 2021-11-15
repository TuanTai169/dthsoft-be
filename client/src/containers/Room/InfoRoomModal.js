import React, { useState } from "react"
import { Modal, Form, Button, Row, Col, FloatingLabel } from "react-bootstrap"
import EditRoomModal from "./EditRoomModal"
import RoomActionButton from "./RoomActionButton"
import DialogDelete from "../../components/Dialog/DialogDelete"
import { deleteRoom } from "../../redux/actions/roomAction"
import { useDispatch, useSelector } from "react-redux"
import { convertStringToDate } from "../../utils/convertDateTime"
import CustomerForm from "../FormBooking/CustomerForm"

const InfoRoomModal = (props) => {
  const { show, handlerModalClose, room } = props
  const { roomNumber, price, roomType, _id } = room
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [conformDialog, setConformDialog] = useState({
    isOpenDialog: false,
    title: "",
    message: "",
  })

  const role = useSelector((state) => state.auth.user.roles)
  const bookings = useSelector((state) => state.bookingReducer.bookings)
  const dispatch = useDispatch()

  const booking = bookings.filter((item) =>
    item.rooms.find((room) => room.roomNumber === roomNumber)
  )

  const renderTable = booking.map((item) => {
    const { code, customer, checkInDate, checkOutDate, deposit, totalPrice } =
      item

    const checkInDateConvert = convertStringToDate(checkInDate)
    const checkOutDateConvert = convertStringToDate(checkOutDate)

    return (
      <Form key={item._id}>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingCode"
              label="BookingID "
              className="mb-3"
            >
              <Form.Control type="text" value={code} disabled />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
          <Col>
            <FloatingLabel
              controlId="floatingCheckIn"
              label="Check in "
              className="mb-3"
            >
              <Form.Control type="text" value={checkInDateConvert} disabled />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingCheckOut"
              label="Check out"
              className="mb-3"
            >
              <Form.Control type="text" value={checkOutDateConvert} disabled />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingDeposit"
              label="Deposit"
              className="mb-3"
            >
              <Form.Control type="text" value={`$ ${deposit}`} disabled />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-3" style={{ borderBottom: "1px solid #bbb" }}>
          <Form.Group controlId="formGridCustomer">
            <Form.Label>Customer</Form.Label>
            <CustomerForm customer={customer} />
          </Form.Group>
        </Row>
        <p>
          Total Price:{" "}
          <strong style={{ color: "red", fontSize: "20px" }}>
            $ {totalPrice}
          </strong>{" "}
        </p>
      </Form>
    )
  })

  const handlerEditModalClose = () => setIsOpenEditModal(false)
  const handlerDelete = (id) => {
    dispatch(deleteRoom(id))
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handlerModalClose}
        size={booking.length > 0 && "lg"}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ROOM {roomNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingRoomType"
                label="RoomType"
                className="mb-3"
              >
                <Form.Control type="text" value={roomType} disabled />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingPrice"
                label="Price"
                className="mb-3"
              >
                <Form.Control type="text" value={`$ ${price} `} disabled />
              </FloatingLabel>
            </Col>
          </Row>
          {booking.length > 0 && renderTable}
        </Modal.Body>
        <Modal.Footer>
          {role !== "EMPLOYEE" && (
            <>
              <Button
                variant="outline-warning"
                onClick={() => setIsOpenEditModal(true)}
              >
                Edit
              </Button>{" "}
              <Button
                variant="outline-danger"
                onClick={() =>
                  setConformDialog({
                    isOpenDialog: true,
                    title: "Delete room",
                    message: "Are you sure delete this record?",
                    onConform: () => handlerDelete(_id),
                  })
                }
              >
                Delete
              </Button>
            </>
          )}
          <RoomActionButton room={room} handlerModalClose={handlerModalClose} />
          <EditRoomModal
            show={isOpenEditModal}
            handlerEditModalClose={handlerEditModalClose}
            handlerModalParentClose={handlerModalClose}
            room={room}
          />
          <DialogDelete
            conformDialog={conformDialog}
            setConformDialog={setConformDialog}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default InfoRoomModal
