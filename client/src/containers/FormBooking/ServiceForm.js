import React from "react"
import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { findService } from "../../redux/actions/serviceAction"

const ServiceForm = (props) => {
  const { services } = props
  const dispatch = useDispatch()

  //Render Table
  const tableHead = ["Name", "Price", "Quantity"]
  const renderHead = tableHead.map((item, index) => {
    return <th key={index}>{item}</th>
  })

  ////NOTE
  const renderService = (id) => {
    dispatch(findService(id))
    return (
      <>
        <td></td>
      </>
    )
  }
  return (
    <>
      <Table striped>
        <thead>
          <tr>{renderHead}</tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service._id}</td>
              <td>{service._id}</td>
              <td>{service.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ServiceForm
