import React, { useState } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addService } from "../../redux/actions/serviceAction"

const AddServiceModal = (props) => {
  const { show, handlerModalClose } = props
  const dispatch = useDispatch()

  const [newService, setNewService] = useState({
    name: "",
    price: 0,
  })

  const onChangeNewForm = (event) =>
    setNewService({ ...newService, [event.target.name]: event.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    resetAddPostData()
    dispatch(addService(newService))
  }

  const resetAddPostData = () => {
    setNewService({ name: "", price: 0 })
    handlerModalClose()
  }
  const { name, price } = newService
  return (
    <>
      <Modal show={show} onHide={resetAddPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name || ""}
                onChange={onChangeNewForm}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price(VND)</Form.Label>
              <Form.Control
                type="text"
                placeholder="0"
                name="price"
                value={price || ""}
                onChange={onChangeNewForm}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="danger" onClick={resetAddPostData}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddServiceModal
