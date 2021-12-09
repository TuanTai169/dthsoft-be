import React, { useRef } from "react"
import ReactToPrint from "react-to-print"
import { Modal, Button } from "react-bootstrap"
import { ComponentToPrint } from "./ComponentToPrint"

const PrintBill = (props) => {
  const componentRef = useRef()
  const { receipt, show, handlerModalClose } = props
  return (
    <div>
      <Modal show={show} onHide={handlerModalClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ComponentToPrint ref={componentRef} receipt={receipt} />
        </Modal.Body>

        <Modal.Footer>
          <ReactToPrint
            trigger={() => <Button variant="danger">Print Bill</Button>}
            content={() => componentRef.current}
          />
          <Button variant="secondary" onClick={handlerModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PrintBill
