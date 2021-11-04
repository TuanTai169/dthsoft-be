import React, { useEffect, useState } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateService } from "./../../redux/actions/serviceAction"

const EditServiceModal = (props) => {
  const { show, handlerModalClose, service } = props
  const dispatch = useDispatch()

  const [editService, setEditService] = useState(service)

  useEffect(() => setEditService(service), [service])

  const onChangeNewForm = (event) =>
    setEditService({
      ...editService,
      [event.target.name]: event.target.value,
    })

  const handleSubmit = (e) => {
    e.preventDefault()
    resetEditPostData()
    dispatch(updateService(editService))
  }

  const resetEditPostData = () => {
    handlerModalClose()
    setEditService(service)
  }
  const { name, price } = editService
  return (
    <div>
      <Modal show={show} onHide={resetEditPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
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
            <Button variant="danger" onClick={resetEditPostData}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default EditServiceModal
