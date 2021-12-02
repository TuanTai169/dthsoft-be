import React from "react"
import { Table } from "react-bootstrap"

const ServiceForm = (props) => {
  const { services } = props

  //Render Table
  const tableHead = ["No#", "Name", "Price (USD)"]
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
          {services.map((service, index) => (
            <tr key={service._id}>
              <td>{index + 1}</td>
              <td>{service.name}</td>
              <td>{service.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ServiceForm
