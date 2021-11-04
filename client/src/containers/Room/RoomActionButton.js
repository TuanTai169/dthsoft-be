import React from "react"
import { ButtonToolbar, Button } from "react-bootstrap"
import { changeStatusRoom } from "../../redux/actions/roomAction"
import { useDispatch } from "react-redux"

const RoomActionButton = (props) => {
  const dispatch = useDispatch()
  const { room, handlerModalClose } = props

  const { status, _id } = room

  const changeStatus = (id, status) => {
    dispatch(changeStatusRoom(id, status))
    handlerModalClose()
  }
  return (
    <>
      <ButtonToolbar>
        {/* CHECK OUT */}
        {status !== "FIXING" && status !== "OCCUPIED" && status !== "BOOKING" && (
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
        {status === "OCCUPIED" && (
          <Button
            variant="warning"
            style={{ marginLeft: "4px", color: "#fff" }}
          >
            <i className="bx bx-transfer-alt"></i>
            <span>&ensp; Change Room</span>
          </Button>
        )}
        {/* CHECK IN */}
        {status === "READY" && (
          <Button variant="info" style={{ marginLeft: "4px", color: "#fff" }}>
            <i className="bx bxs-user-x"></i>
            <span>&ensp;Booking</span>
          </Button>
        )}
        {(status === "BOOKING" || status === "READY") && (
          <Button variant="primary" style={{ marginLeft: "4px" }}>
            <i className="bx bxs-user-check"></i>
            <span>&ensp;Check in</span>
          </Button>
        )}
        {/* CHECK OUT */}
        {status === "OCCUPIED" && (
          <Button variant="danger" style={{ marginLeft: "4px" }}>
            <i className="bx bxs-magic-wand"></i>
            <span>&ensp;Check out</span>
          </Button>
        )}
      </ButtonToolbar>
    </>
  )
}

export default RoomActionButton
