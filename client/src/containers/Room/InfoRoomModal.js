import React, { useState } from "react"
import { Modal, Row, Col, Button } from "react-bootstrap"
import EditRoomModal from "./EditRoomModal"
import RoomActionButton from "./RoomActionButton"
import DialogDelete from "../../components/Dialog/DialogDelete"
import { deleteRoom } from "../../redux/actions/roomAction"
import { useDispatch, useSelector } from "react-redux"

const InfoRoomModal = (props) => {
  const { show, handlerModalClose, room } = props
  const { roomNumber, price, roomType, _id } = room
  const role = useSelector((state) => state.auth.user.roles)
  const dispatch = useDispatch()

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [conformDialog, setConformDialog] = useState({
    isOpenDialog: false,
    title: "",
    message: "",
  })

  const handlerEditModalClose = () => setIsOpenEditModal(false)
  const handlerDelete = (id) => {
    dispatch(deleteRoom(id))
  }

  return (
    <>
      <Modal show={show} onHide={handlerModalClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>ROOM {roomNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="col-6">
              <strong>Type:</strong> {roomType}
            </Col>
            <Col className="col-6">
              <strong>Price:</strong> {price}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {role !== "EMPLOYEE" && (
            <>
              <Button
                variant="outline-warning"
                onClick={() => setIsOpenEditModal(true)}
              >
                Edit
              </Button>{" "}
              <Button
                variant="outline-danger"
                onClick={() =>
                  setConformDialog({
                    isOpenDialog: true,
                    title: "Delete room",
                    message: "Are you sure delete this record?",
                    onConform: () => handlerDelete(_id),
                  })
                }
              >
                Delete
              </Button>
            </>
          )}

          <RoomActionButton room={room} handlerModalClose={handlerModalClose} />
          <EditRoomModal
            show={isOpenEditModal}
            handlerEditModalClose={handlerEditModalClose}
            handlerModalParentClose={handlerModalClose}
            room={room}
          />
          <DialogDelete
            conformDialog={conformDialog}
            setConformDialog={setConformDialog}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default InfoRoomModal
