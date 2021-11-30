import React from "react"
import { convertStringToDate } from "../../utils/convertDateTime"

const RoomRevenueItem = (props) => {
  const { room } = props

  const checkInDate = convertStringToDate(room.checkInDate)
  const checkOutDate = convertStringToDate(room.checkOutDate)

  return (
    <>
      <td>{room.room}</td>
      <td>{room.type}</td>
      <td>{checkInDate}</td>
      <td>{checkOutDate}</td>
      <td>{room.price}</td>
      <td>{room.additional}</td>
      <td>{room.price + room.additional}</td>
    </>
  )
}

export default RoomRevenueItem
