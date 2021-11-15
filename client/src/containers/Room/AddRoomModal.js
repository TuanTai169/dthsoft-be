import React, { useState } from "react"
import { Form, Modal, Button, Row, Col } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addRoom } from "./../../redux/actions/roomAction"

const AddRoomModal = (props) => {
  const { show, handlerModalClose } = props
  const dispatch = useDispatch()

  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    floor: 1,
    price: 0,
    roomType: "",
  })

  const onChangeNewForm = (event) =>
    setNewRoom({ ...newRoom, [event.target.name]: event.target.value })

  const handlerSubmit = (e) => {
    e.preventDefault()
    resetAddPostData()
    dispatch(addRoom(newRoom))
  }
  const resetAddPostData = () => {
    setNewRoom({
      roomNumber: "",
      floor: 1,
      price: 0,
      roomType: "",
    })
    handlerModalClose()
  }
  const { roomNumber, floor, price, roomType } = newRoom
  return (
    <>
      <Modal show={show} onHide={resetAddPostData} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>ADD ROOM </Modal.Title>
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
            <Button variant="danger" onClick={resetAddPostData}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddRoomModal
