import React from "react"
import { Table } from "react-bootstrap"

const CustomerForm = (props) => {
  const { customer } = props

  //Render Table
  const tableHead = ["Name", "Phone", "Email"]
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
          <tr>
            {customer !== null && (
              <>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
              </>
            )}
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default CustomerForm
