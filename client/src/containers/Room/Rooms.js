import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, ButtonToolbar } from "react-bootstrap"
import lodash from "lodash"
import RoomItem from "./RoomItem"
import AddRoomModal from "./AddRoomModal"
import { getAllRoom } from "../../redux/actions/roomAction"

const Rooms = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  const rooms = useSelector((state) => state.roomReducer.rooms)
  const role = useSelector((state) => state.auth.user.roles)
  const dispatch = useDispatch()

  useEffect(() => dispatch(getAllRoom()), [dispatch])

  //Group BY FLOOR
  const roomGroupedByFloor = lodash.groupBy(rooms, "floor")
  const roomGroupedByStatus = lodash.groupBy(rooms, "status")

  // CONVERT OBJECT TO ARRAY
  const arrayRoom = Object.values(roomGroupedByFloor)
  const arrayStatusRoom = Object.entries(roomGroupedByStatus)

  //Close Add Modal
  const handlerCloseAddModal = () => setIsOpenAddModal(false)
  return (
    <div>
      <div className="page__header" style={{ marginBottom: "10px" }}>
        <div className="page__title">
          <h3>Room Diagram</h3>
        </div>
        <div className="page__status">
          <Button
            variant="outline-info"
            style={{
              marginLeft: "16px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <i className="bx bxs-home"></i>
            {rooms.length}
          </Button>
          {arrayStatusRoom.map((item, index) => (
            <Button
              variant={
                item[0] === "OCCUPIED"
                  ? "outline-success"
                  : item[0] === "CLEANING"
                  ? "outline-secondary"
                  : item[0] === "BOOKING"
                  ? "outline-warning"
                  : item[0] === "FIXING"
                  ? "outline-danger"
                  : "outline-primary"
              }
              key={index}
              style={{
                marginLeft: "16px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {item[0] === "READY" && <i className="bx bxs-check-circle"></i>}
              {item[0] === "BOOKING" && <i className="bx bxs-user-x"></i>}
              {item[0] === "OCCUPIED" && <i className="bx bxs-user-check"></i>}
              {item[0] === "CLEANING" && <i className="bx bxs-magic-wand"></i>}
              {item[0] === "FIXING" && <i className="bx bxs-edit"></i>}

              {item[1].length}
            </Button>
          ))}
        </div>
        <div className="page__action">
          <ButtonToolbar>
            {role !== "EMPLOYEE" && (
              <Button onClick={() => setIsOpenAddModal(true)}>Add Room</Button>
            )}
            <AddRoomModal
              show={isOpenAddModal}
              handlerModalClose={handlerCloseAddModal}
            />
          </ButtonToolbar>
        </div>
      </div>
      <div className="page__body">
        <div className="row">
          <div className="col">
            {arrayRoom.map((floor, index) => (
              <div className="row" key={index}>
                {floor.map((room) => (
                  <div className="col-2" key={room._id}>
                    <RoomItem room={room} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rooms
