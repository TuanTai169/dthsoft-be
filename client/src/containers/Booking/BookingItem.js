import React, { useState } from "react"
import { convertStringToDate } from "../../utils/convertDateTime"
import { Button } from "react-bootstrap"
import ViewDetailBookingModal from "./ViewDetailBookingModal"
const BookingItem = (props) => {
  const { booking } = props
  const [isOpenViewModal, setIsOpenViewModal] = useState(false)

  const { code, customer, rooms, checkInDate, checkOutDate } = booking

  const checkInDateConvert = convertStringToDate(checkInDate)
  const checkOutDateConvert = convertStringToDate(checkOutDate)

  const handlerViewModalClose = () => setIsOpenViewModal(false)

  const renderRoom = rooms.map((room) => {
    return <span key={room._id}>{room.roomNumber}</span>
  })
  return (
    <>
      <td>{code}</td>
      <td>{customer.name}</td>
      <td>{customer.phone}</td>
      <td>{renderRoom}</td>
      <td>{checkInDateConvert}</td>
      <td>{checkOutDateConvert}</td>
      <td>
        <Button variant="info" onClick={() => setIsOpenViewModal(true)}>
          {" "}
          <i className="bx bx-detail icon-bg" style={{ color: "#fff" }}></i>
        </Button>
        <ViewDetailBookingModal
          show={isOpenViewModal}
          handlerModalClose={handlerViewModalClose}
          booking={booking}
        />
      </td>
    </>
  )
}

export default BookingItem
