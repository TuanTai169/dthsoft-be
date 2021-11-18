import React from "react"
import { Table } from "react-bootstrap"

import ServiceItem from "./ServiceItem"

function ServiceTable(props) {
  const { services, role } = props

  //Reder Table
  const tableHead = ["name", "price (USA)", "action"]
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
          {services.map((service) => (
            <tr key={service._id}>
              <ServiceItem role={role} service={service} />
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ServiceTable
