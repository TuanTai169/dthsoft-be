import React, { useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import BookingTable from "./BookingTable"
import { getAllRoom } from "./../../redux/actions/roomAction"
import FullLoading from "../../components/Common/FullLoading/FullLoading"

const ViewAllBookingModal = (props) => {
  const { show, handlerModalClose } = props
  const dispatch = useDispatch()

  // GET ALL BOOKING
  const bookings = useSelector((state) => state.bookingReducer.bookings)
  const isBookingLoading = useSelector(
    (state) => state.bookingReducer.isBookingLoading
  )
  const receipts = useSelector((state) => state.receiptReducer.receipts)

  useEffect(() => dispatch(getAllRoom()), [dispatch, bookings, receipts])

  // BOOKING GROUP BY BOOKING
  //const bookingGroupBy = lodash.groupBy(bookings, "status")
  //bookingGroupBy["BOOKING"]

  return (
    <>
      {isBookingLoading ? (
        <FullLoading />
      ) : (
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
            <BookingTable bookings={bookings} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlerModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default ViewAllBookingModal
