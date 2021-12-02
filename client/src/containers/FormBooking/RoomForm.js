import React from "react"
import { Table } from "react-bootstrap"

const RoomForm = (props) => {
  const { rooms } = props

  //Render Table
  const tableHead = ["No#", "Number", "Floor", "Type", "Price (USD)"]
  const renderHead = tableHead.map((item, index) => {
    return (
      <th key={index} style={{ fontWeight: 500 }}>
        {item}
      </th>
    )
  })

  return (
    <>
      <Table striped>
        <thead>
          <tr>{renderHead}</tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={room._id}>
              <td>{index + 1}</td>
              <td>{room.roomNumber}</td>
              <td>{room.floor}</td>
              <td>{room.roomType}</td>
              <td>{room.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default RoomForm
