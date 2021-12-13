import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useSelector } from "react-redux"

const ViewAllServiceModal = (props) => {
  const { show, handlerModalClose, getService } = props

  const [serviceSelect, setServiceSelect] = useState([])

  const services = useSelector((state) => state.serviceReducer.services)

  const sortService = services.sort((a, b) => (a.price > b.price ? -1 : 1))

  const selectedService = (e, service) => {
    if (e.target.style.backgroundColor.toString() === "rgb(255, 255, 255)") {
      const exits = serviceSelect.some((item) => item._id === service._id)
      if (!exits) {
        setServiceSelect([...serviceSelect, service])
        e.target.style.backgroundColor = "#7fff00"
      }
    } else {
      const newArray = serviceSelect.filter((item) => item._id !== service._id)
      setServiceSelect(newArray)
      e.target.style.backgroundColor = "#fff"
    }
  }
  const submitService = () => {
    serviceSelect.forEach((item) => getService(item))
    resetModal()
  }
  const resetModal = () => {
    handlerModalClose()
  }
  return (
    <>
      <Modal
        show={show}
        onHide={resetModal}
        animation={false}
        dialogClassName="modal-80w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {sortService.map((item) => (
              <div className="col-4" key={item._id}>
                <div
                  id="service"
                  className="status-card"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#fff",
                  }}
                  onClick={(e) => {
                    selectedService(e, item)
                  }}
                >
                  <div className="status-card__info">
                    <h4>${item.price}</h4>
                    <h6>{item.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={submitService}>
            Save
          </Button>
          <Button variant="secondary" onClick={resetModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewAllServiceModal
