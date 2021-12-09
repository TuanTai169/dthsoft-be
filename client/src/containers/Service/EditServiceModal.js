import React, { useEffect, useState } from "react"
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateService } from "./../../redux/actions/serviceAction"
import { nameValidation, numberValidation } from "../../utils/validation"

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
    if (
      nameValidation(editService.name) &&
      numberValidation(editService.price)
    ) {
      resetEditPostData()
      dispatch(updateService(editService))
    }
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
              label="Price (USD)"
              className="mb-3"
            >
              <Form.Control
                type="number"
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
            <Button variant="secondary" onClick={resetEditPostData}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default EditServiceModal
