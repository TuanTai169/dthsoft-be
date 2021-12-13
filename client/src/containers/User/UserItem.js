import React, { useState } from "react"
import { Button, ButtonToolbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import DialogDelete from "../../components/Dialog/DialogDelete"
import DetailUserModal from "./DetailUserModal"
import EditUserModal from "./EditUserModal"
import { deleteUser } from "../../redux/actions/userAction"

const UserItem = (props) => {
  const { user } = props
  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.user.roles)

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
    dispatch(deleteUser(id))
  }

  return (
    <>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
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
                title: "Delete user",
                message: "Are you sure delete this record?",
                onConform: () => handlerDelete(user._id),
              })
            }
          >
            {" "}
            <i className="bx bx-trash-alt icon-bg"></i>
          </Button>
          {
            <EditUserModal
              handlerModalClose={handlerModalEditClose}
              show={isEditOpen}
              user={user}
            />
          }
          <DetailUserModal
            handlerModalClose={handlerModalViewClose}
            show={isViewOpen}
            user={user}
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

export default UserItem
