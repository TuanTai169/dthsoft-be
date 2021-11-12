import React from "react"
import { Table } from "react-bootstrap"
import CustomerItem from "./CustomerItem"

function CustomerTable(props) {
  const { customers } = props

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
          {customers.map((customer) => (
            <tr key={customer._id}>
              <CustomerItem customer={customer} />
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default CustomerTable
