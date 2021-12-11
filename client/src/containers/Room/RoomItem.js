import React, { useState } from "react"
import InfoRoomModal from "./InfoRoomModal"

const RoomItem = (props) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const { room } = props
  const { roomNumber, price, roomType, status } = room

  const handlerCloseInfoModal = () => setIsInfoOpen(false)

  return (
    <>
      <div
        className="status-card"
        style={{
          cursor: "pointer",
          backgroundColor:
            status === "OCCUPIED"
              ? "tomato"
              : status === "CLEANING"
              ? "yellow"
              : status === "FIXING"
              ? "#ccc"
              : "#fff",
        }}
        onClick={() => {
          setIsInfoOpen(true)
        }}
      >
        <div className="status-card__info">
          <h4>{roomNumber}</h4>
          <span>${price}</span>
          <p>{roomType}</p>
        </div>
      </div>
      <InfoRoomModal
        room={room}
        show={isInfoOpen}
        handlerModalClose={handlerCloseInfoModal}
      />
    </>
  )
}

export default RoomItem
