import React, { useEffect, useState } from "react"
import { Form, Modal, Button, Row, Col } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateRoom } from "../../redux/actions/roomAction"
import { numberValidation } from "../../utils/validation"

const EditRoomModal = (props) => {
  const { show, handlerEditModalClose, handlerModalParentClose, room } = props
  const dispatch = useDispatch()

  const [editRoom, setEditRoom] = useState(room)

  useEffect(() => setEditRoom(room), [room])

  const onChangeNewForm = (event) =>
    setEditRoom({ ...editRoom, [event.target.name]: event.target.value })

  const handlerSubmit = (e) => {
    e.preventDefault()
    if (
      numberValidation(editRoom.floor) &&
      numberValidation(editRoom.price) &&
      numberValidation(editRoom.roomNumber)
    ) {
      resetEditPostData()
      handlerModalParentClose()
      dispatch(updateRoom(editRoom))
    }
  }

  const resetEditPostData = () => {
    handlerEditModalClose()
    setEditRoom(room)
  }
  const { roomNumber, floor, price, roomType } = editRoom
  return (
    <>
      <Modal show={show} onHide={resetEditPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT ROOM </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handlerSubmit}>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicFloor">
                  <Form.Label>Floor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1"
                    name="floor"
                    value={floor || ""}
                    onChange={onChangeNewForm}
                    required
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRoomNumber">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="101"
                    name="roomNumber"
                    value={roomNumber || ""}
                    onChange={onChangeNewForm}
                    required
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label>Price(USD)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0"
                    name="price"
                    value={price || ""}
                    onChange={onChangeNewForm}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="roomType"
                    value={roomType}
                    onChange={onChangeNewForm}
                  >
                    <option className="d-none" value="">
                      Select Type
                    </option>
                    <option value="SINGLE">SINGLE</option>
                    <option value="DOUBLE">DOUBLE</option>
                    <option value="DELUXE">DELUXE</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
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
    </>
  )
}

export default EditRoomModal
