import React from "react"
import { Button, Modal } from "react-bootstrap"

function DialogDelete(props) {
  const { conformDialog, setConformDialog } = props

  const handlerDialogClose = () =>
    setConformDialog({
      isOpenDialog: false,
      title: "",
      message: "",
    })

  return (
    <>
      <Modal show={conformDialog.isOpenDialog} onHide={handlerDialogClose}>
        <Modal.Header closeButton>
          <Modal.Title>{conformDialog.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{conformDialog.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerDialogClose}>
            Close
          </Button>
          <Button variant="danger" onClick={conformDialog.onConform}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DialogDelete
