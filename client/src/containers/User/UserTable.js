import React from "react"
import { Table } from "react-bootstrap"
import UserItem from "./UserItem"

function UserTable(props) {

  const { users, roles } = props
  const tableHead = ["name", "email", "phone", "action"]
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
          {users.map((user) => (
            <tr key={user._id}>
              <UserItem roles={roles} user={user} />
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default UserTable
