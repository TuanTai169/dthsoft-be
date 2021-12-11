import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import lodash from "lodash"
import { changeRoom } from "./../../redux/actions/bookingAction"
import DialogChange from "../../components/Dialog/DialogChange"

const ViewAllRoomModal = (props) => {
  const {
    show,
    handlerModalClose,
    handlerParentModalClose,
    roomChoose,
    getRoom,
    bookingId,
  } = props
  const [roomChange, setRoomChange] = useState("")
  const [roomSelect, setRoomSelect] = useState([])
  const [conformDialog, setConformDialog] = useState({
    isOpenDialog: false,
    title: "",
    message: "",
  })

  const dispatch = useDispatch()
  const rooms = useSelector((state) => state.roomReducer.rooms)

  //Group BY FLOOR
  const roomGroupedByFloor = lodash.groupBy(rooms, "floor")

  // CONVERT OBJECT TO ARRAY
  const arrayRoom = Object.values(roomGroupedByFloor)

  //Selected Room
  const selectedRoom = (e, room) => {
    if (e.target.style.backgroundColor.toString() === "rgb(255, 255, 255)") {
      const exitsRoom = roomSelect.some((item) => item._id === room._id)
      if (!exitsRoom) {
        setRoomSelect([...roomSelect, room])
        e.target.style.backgroundColor = "#7fff00"
      }
    } else {
      const newArray = roomSelect.filter((item) => item._id !== room._id)
      setRoomSelect(newArray)
      e.target.style.backgroundColor = "#fff"
    }
  }
  //Change Room
  const selectedChangeRoom = (e, room) => {
    if (e.target.style.backgroundColor.toString() === "rgb(255, 255, 255)") {
      setRoomChange(room)
      e.target.style.backgroundColor = "#7fff00"
    } else {
      setRoomChange("")
      e.target.style.backgroundColor = "#fff"
    }
  }

  const onChangeRoomSubmit = () => {
    dispatch(changeRoom(bookingId, roomChoose._id, roomChange._id))
    resetModal()
    handlerParentModalClose()
  }
  const submitArrayRoom = () => {
    roomSelect.forEach((item) => getRoom(item))
    resetModal()
  }
  const resetModal = () => {
    setRoomSelect([])
    handlerModalClose()
  }

  return (
    <>
      <Modal
        show={show}
        onHide={resetModal}
        animation={false}
        dialogClassName="modal-60w"
      >
        <Modal.Header closeButton>
          <Modal.Title>List Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {arrayRoom.map((floor, index) => (
            <div className="row" key={index}>
              {floor.map((room) => (
                <div className="col-2" key={room._id}>
                  <div
                    id="room"
                    className="status-card"
                    style={{
                      cursor: room.status === "READY" && "pointer",
                      backgroundColor:
                        room._id === roomChoose._id
                          ? "#7fff00"
                          : room.status === "OCCUPIED"
                          ? "tomato"
                          : room.status === "CLEANING"
                          ? "yellow"
                          : room.status === "FIXING"
                          ? "#ccc"
                          : "#fff",
                    }}
                    onClick={(e) => {
                      ;(room.status === "READY" || room.status === "BOOKING") &&
                        room._id !== roomChoose._id &&
                        (roomChoose.status === "READY" ||
                          roomChoose.status === "BOOKING") &&
                        selectedRoom(e, room)
                      room.status === "READY" &&
                        room._id !== roomChoose._id &&
                        roomChoose.status === "OCCUPIED" &&
                        selectedChangeRoom(e, room)
                    }}
                  >
                    <div className="status-card__info">
                      <h4>{room.roomNumber}</h4>
                      <span>${room.price}</span>
                      <p>{room.roomType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          {roomChoose.status === "OCCUPIED" && (
            <Button
              variant="warning"
              style={{ color: "#fff" }}
              onClick={() =>
                setConformDialog({
                  isOpenDialog: true,
                  title: "Change room",
                  message: "Are you sure change room this booking?",
                  onConform: () => onChangeRoomSubmit(),
                })
              }
            >
              Change
            </Button>
          )}
          {(roomChoose.status === "READY" ||
            roomChoose.status === "BOOKING") && (
            <Button variant="danger" onClick={submitArrayRoom}>
              Save
            </Button>
          )}
          <Button variant="secondary" onClick={resetModal}>
            Close
          </Button>
          <DialogChange
            conformDialog={conformDialog}
            setConformDialog={setConformDialog}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewAllRoomModal
