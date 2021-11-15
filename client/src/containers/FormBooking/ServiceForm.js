import React from "react"
import { Table } from "react-bootstrap"
import { arrayService } from "./../../utils/countService"

const ServiceForm = (props) => {
  const { services } = props

  //Render Table
  const tableHead = ["Name", "Price", "Quantity"]
  const renderHead = tableHead.map((item, index) => {
    return (
      <th key={index} style={{ fontWeight: 500 }}>
        {item}
      </th>
    )
  })
  const array = arrayService(services)

  return (
    <>
      <Table striped>
        <thead>
          <tr>{renderHead}</tr>
        </thead>
        <tbody>
          {array.map((service) => (
            <tr key={service._id}>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <td>{service.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ServiceForm
