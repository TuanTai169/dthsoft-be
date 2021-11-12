import React from "react"
import { Table } from "react-bootstrap"

const RoomForm = (props) => {
  const { rooms } = props

  //Render Table
  const tableHead = ["Number", "Floor", "Type", "Price"]
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
          {rooms.map((room) => (
            <tr key={room._id}>
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
