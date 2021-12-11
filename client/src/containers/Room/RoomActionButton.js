import React, { useState } from "react"
import { ButtonToolbar, Button } from "react-bootstrap"
import { changeStatusRoom } from "../../redux/actions/roomAction"
import { useDispatch } from "react-redux"
import BookingModal from "../Booking/BookingModal"
import CheckInModal from "../Booking/CheckInModal"
import ViewAllRoomModal from "./ViewAllRoomModal"
import DialogChange from "../../components/Dialog/DialogChange"
import CheckOutModal from "../Receipt/CheckOutModal"

const RoomActionButton = (props) => {
  const dispatch = useDispatch()

  const { room, handlerModalClose, booking } = props

  const [isOpenBooking, setIsOpenBooking] = useState(false)
  const [isOpenCheckIn, setIsOpenCheckIn] = useState(false)
  const [isOpenCheckOut, setIsOpenCheckOut] = useState(false)
  const [isOpenViewRoom, setIsOpenViewRoom] = useState(false)

  const [conformDialog, setConformDialog] = useState({
    isOpenDialog: false,
    title: "",
    message: "",
  })

  const handlerCloseBookingModal = () => setIsOpenBooking(false)
  const handlerCloseCheckInModal = () => setIsOpenCheckIn(false)
  const handlerCloseCheckOutModal = () => setIsOpenCheckOut(false)
  const handlerCloseViewRoomModal = () => setIsOpenViewRoom(false)

  const { status, _id } = room
  const bookingId = booking.map((item) => item._id)

  const changeStatus = (id, status) => {
    dispatch(changeStatusRoom(id, status))
    handlerModalClose()
  }

  return (
    <>
      <ButtonToolbar>
        {/* CHECK OUT */}
        {status !== "FIXING" && status !== "OCCUPIED" && (
          <Button
            variant="secondary"
            style={{ marginLeft: "4px" }}
            onClick={() => changeStatus(_id, "fix")}
          >
            <i className="bx bxs-edit"></i>
            <span>&ensp;Fixing</span>
          </Button>
        )}
        {/* READY */}
        {(status === "CLEANING" || status === "FIXING") && (
          <Button
            variant="success"
            style={{ marginLeft: "4px" }}
            onClick={() => changeStatus(_id, "ready")}
          >
            <i className="bx bxs-check-circle"></i>
            <span>&ensp;Ready</span>
          </Button>
        )}
        {/* CHANGE ROOM */}
        {/* {status === "OCCUPIED" && (
          <Button
            variant="warning"
            style={{ marginLeft: "4px", color: "#fff" }}
            onClick={() => setIsOpenViewRoom(true)}
          >
            <i className="bx bx-transfer-alt"></i>
            <span>&ensp; Change Room</span>
          </Button>
        )} */}
        {/* BOOKING */}
        {status !== "CLEANING" && status !== "FIXING" && (
          <>
            <Button
              variant="info"
              style={{ marginLeft: "4px", color: "#fff" }}
              onClick={() => setIsOpenBooking(true)}
            >
              <i className="bx bxs-user-x"></i>
              <span>&ensp;Booking</span>
            </Button>
            <BookingModal
              show={isOpenBooking}
              handlerModalClose={handlerCloseBookingModal}
              currentRoom={room}
              handlerParentModalClose={handlerModalClose}
            />
          </>
        )}

        {/* CHECK IN */}
        {status !== "OCCUPIED" && status !== "CLEANING" && status !== "FIXING" && (
          <>
            <Button
              variant="primary"
              style={{ marginLeft: "4px" }}
              onClick={() => setIsOpenCheckIn(true)}
            >
              <i className="bx bxs-user-check"></i>
              <span>&ensp;Check in</span>
            </Button>
            <CheckInModal
              show={isOpenCheckIn}
              handlerModalClose={handlerCloseCheckInModal}
              currentRoom={room}
              handlerParentModalClose={handlerModalClose}
            />
          </>
        )}

        {/* CHECK OUT */}
        {/* {status === "OCCUPIED" && (
          <>
            <Button
              variant="success"
              style={{ marginLeft: "4px" }}
              onClick={() => setIsOpenEditBooking(true)}
            >
              <i className="bx bx-plus-medical"></i>
              <span>&ensp;Add Service</span>
            </Button>
            <EditBookingModal
              show={isOpenEditBooking}
              handlerModalClose={handlerCloseEditBookingModal}
              handlerParentModalClose={handlerModalClose}
              booking={booking}
            />
          </>
        )} */}
        {status === "OCCUPIED" && (
          <>
            <Button
              variant="danger"
              style={{ marginLeft: "4px" }}
              onClick={() => setIsOpenCheckOut(true)}
            >
              <i className="bx bxs-magic-wand"></i>
              <span>&ensp;Check out</span>
            </Button>
            <CheckOutModal
              show={isOpenCheckOut}
              handlerModalClose={handlerCloseCheckOutModal}
              handlerParentModalClose={handlerModalClose}
              booking={booking}
            />
          </>
        )}

        <ViewAllRoomModal
          show={isOpenViewRoom}
          handlerModalClose={handlerCloseViewRoomModal}
          roomChoose={room}
          bookingId={bookingId.toString()}
          handlerParentModalClose={handlerModalClose}
        />
        <DialogChange
          conformDialog={conformDialog}
          setConformDialog={setConformDialog}
        />
      </ButtonToolbar>
    </>
  )
}

export default RoomActionButton
