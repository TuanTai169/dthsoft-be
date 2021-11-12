import React, { useState } from "react"
import { Button, ButtonToolbar } from "react-bootstrap"
import { useDispatch } from "react-redux"
import DetailCustomerModal from "./DetailCustomerModal"
import DialogDelete from "../../components/Dialog/DialogDelete"
import EditCustomersModal from "./EditCustomerModal"
import { deleteCustomer } from "../../redux/actions/customerAction"

const CustomerItem = (props) => {
  const { customer, role } = props
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
    dispatch(deleteCustomer(id))
  }

  return (
    <>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
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
                title: "Delete Customer",
                message: "Are you sure delete this record?",
                onConform: () => handlerDelete(customer._id),
              })
            }
          >
            {" "}
            <i className="bx bx-trash-alt icon-bg"></i>
          </Button>
          <EditCustomersModal
            handlerModalClose={handlerModalEditClose}
            show={isEditOpen}
            customer={customer}
          />
          <DetailCustomerModal
            handlerModalClose={handlerModalViewClose}
            show={isViewOpen}
            customer={customer}
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

export default CustomerItem
