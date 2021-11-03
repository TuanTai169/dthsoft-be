import React, { useState } from "react"
import { Button, ButtonToolbar } from "react-bootstrap"
import EditServiceModal from "./EditServiceModal"
import { deleteService } from "../../redux/actions/serviceAction"
import { useDispatch } from "react-redux"
import DetailServiceModal from "./DetailServiceModal"
import DialogDelete from "../../components/Dialog/DialogDelete"

const ServiceItem = (props) => {
  const { service, role } = props
  const dispatch = useDispatch()

  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [conformDialog, setConformDialog] = useState({
    isOpenDialog: false,
    title: "",
    message: "",
  })

  const handlerModalViewClose = () => setIsViewOpen(false)
  const handlerModalEditClose = () => setIsEditOpen(false)

  const handlerDelete = (id) => {
    dispatch(deleteService(id))
  }

  return (
    <>
      <td>{service.name}</td>
      <td>{service.price}</td>
      <td>
        <ButtonToolbar>
          <Button
            variant="info"
            className="btn btn-view"
            onClick={() => setIsViewOpen(true)}
          >
            <i className="bx bx-detail icon-bg" style={{ color: "#fff" }}></i>
          </Button>
          <Button
            variant="primary"
            className={role === "EMPLOYEE" ? "disabled" : "btn btn-edit"}
            style={{ marginLeft: "12px" }}
            onClick={() => setIsEditOpen(true)}
          >
            <i className="bx bxs-edit-alt icon-bg"></i>
          </Button>
          <Button
            variant="danger"
            className={role === "EMPLOYEE" ? "disabled" : "btn btn-delete"}
            style={{ marginLeft: "12px" }}
            onClick={() =>
              setConformDialog({
                isOpenDialog: true,
                title: "Delete service",
                message: "Are you sure delete this record?",
                onConform: () => handlerDelete(service._id),
              })
            }
          >
            {" "}
            <i className="bx bx-trash-alt icon-bg"></i>
          </Button>
          <EditServiceModal
            handlerModalClose={handlerModalEditClose}
            show={isEditOpen}
            service={service}
          />
          <DetailServiceModal
            handlerModalClose={handlerModalViewClose}
            show={isViewOpen}
            service={service}
          />
          <DialogDelete
            conformDialog={conformDialog}
            setConformDialog={setConformDialog}
          />
        </ButtonToolbar>
      </td>
    </>
  )
}

export default ServiceItem
