import React from "react"
import { Table } from "react-bootstrap"
import CustomersItem from "./CustomersItem"

function CustomersTable(props) {
  const { customers } = props

  const tableHead = ["name", "gender", , "email", "phone", "address", "action"]
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
              <CustomersItem customer={customer} />
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default CustomersTable
