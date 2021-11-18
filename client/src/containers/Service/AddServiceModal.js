import React, { useState } from "react"
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap"
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
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name || ""}
                onChange={onChangeNewForm}
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPrice"
              label="Price"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="0"
                name="price"
                value={price || ""}
                onChange={onChangeNewForm}
                required
              />
            </FloatingLabel>
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
