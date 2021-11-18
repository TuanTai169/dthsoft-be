import React, { useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import BookingTable from "./BookingTable"
import lodash from "lodash"
import { getAllRoom } from "./../../redux/actions/roomAction"

const ViewAllBookingModal = (props) => {
  const { show, handlerModalClose } = props
  const dispatch = useDispatch()

  // GET ALL BOOKING
  const bookings = useSelector((state) => state.bookingReducer.bookings)
  const receipts = useSelector((state) => state.receiptReducer.receipts)

  useEffect(() => dispatch(getAllRoom()), [dispatch, bookings, receipts])

  // BOOKING GROUP BY BOOKING
  const bookingGroupBy = lodash.groupBy(bookings, "status")

  return (
    <>
      <Modal
        show={show}
        onHide={handlerModalClose}
        animation={false}
        dialogClassName="modal-80w"
      >
        <Modal.Header closeButton>
          <Modal.Title>LIST BOOKING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingTable bookings={bookingGroupBy["BOOKING"]} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewAllBookingModal
