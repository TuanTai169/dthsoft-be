import React from "react"
import { Table } from "react-bootstrap"
import BookingItem from "./BookingItem"

const BookingTable = (props) => {
  const { bookings } = props

  //Reder Table
  const tableHead = [
    "#ID",
    "Customer",
    "Room",
    "Check in",
    "Check out",
    "Action",
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
          {Array.isArray(bookings) && bookings.length ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <BookingItem booking={booking} />
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No Booking</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default BookingTable
