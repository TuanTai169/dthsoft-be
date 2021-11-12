import React from "react"
import { Table } from "react-bootstrap"
import BookingItem from "./BookingItem"
const BookingTable = (props) => {
  const { bookings } = props

  //Reder Table
  const tableHead = [
    "#ID",
    "Customer",
    "Phone",
    "Room",
    "Check in",
    "Check out",
    "action",
  ]
  const renderHead = tableHead.map((item, index) => {
    return <th key={index}>{item}</th>
  })
  return (
    <>
      <Table striped>
        <thead>
          <tr>{renderHead}</tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <BookingItem booking={booking} />
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default BookingTable
