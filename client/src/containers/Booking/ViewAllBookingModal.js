import React from "react"
import { Modal, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import BookingTable from "./BookingTable"
import lodash from "lodash"

const ViewAllBookingModal = (props) => {
  const { show, handlerModalClose } = props

  // GET ALL BOOKING
  const bookings = useSelector((state) => state.bookingReducer.bookings)

  // BOOKING GROUP BY BOOKING
  const bookingGroupBy = lodash.groupBy(bookings, "status")

  return (
    <>
      <Modal
        show={show}
        onHide={handlerModalClose}
        animation={false}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>LIST BOOKING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingTable bookings={bookingGroupBy["BOOKING"]} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handlerModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewAllBookingModal
