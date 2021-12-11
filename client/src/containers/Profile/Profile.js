import "./Profile.css"
import React, { Fragment, useEffect } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import EditProfileModal from "./EditProfileModal"
import { loadUser } from "./../../redux/actions/authAction"
import axios from "axios"
import { HOST_API_URL } from "../../redux/constants/api"
import { toast } from "react-toastify"
import FullLoading from "../../components/Common/FullLoading/FullLoading"
import ChangePasswordModal from "./ChangePasswordModal"

const Profile = () => {
  const user = useSelector((state) => state.auth.user)
  const users = useSelector((state) => state.userReducer.users)
  const isLoading = useSelector((state) => state.userReducer.isUserLoading)
  const role = useSelector((state) => state.auth.user.roles)
  const dispatch = useDispatch()
  useEffect(() => dispatch(loadUser()), [dispatch, users])

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isChangePassOpen, setIsChangePassOpen] = useState(false)
  const [avatar, setAvatar] = useState(false)

  const handlerModalEditClose = () => setIsEditOpen(false)
  const handlerModalChangePassClose = () => setIsChangePassOpen(false)

  const changeAvatar = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]

      if (!file) toast.error("No files were uploaded")

      if (file.size > 1024 * 1024) toast.error("Size too large")

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        toast.error("File format is incorrect")

      let formData = new FormData()
      formData.append("file", file)

      const res = await axios.post(
        `${HOST_API_URL}/user/upload-avatar/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      toast.success(res.data.message)
      setAvatar(res.data.url)
      dispatch(loadUser())
    } catch (err) {
      err.response && toast.error(err.response.data.message)
    }
  }

  return (
    <>
      {isLoading ? (
        <FullLoading />
      ) : (
        <Fragment>
          {" "}
          <Row>
            <h4>
              {role === "ADMIN"
                ? "Admin Profile"
                : role === "MANAGER"
                ? "Manager Profile"
                : "Employee Profile"}
            </h4>
          </Row>
          <Row>
            <Col sm={4}>
              <div className="profile-img">
                <img src={avatar ? avatar : user.image} alt="" />
                <div className="file btn btn-lg btn-primary">
                  <input
                    type="file"
                    name="file"
                    id="avatar-upload"
                    style={{ cursor: "pointer" }}
                    onChange={changeAvatar}
                  />
                  <label className="upload-label" htmlFor="avatar-upload">
                    Change avatar
                  </label>
                </div>
              </div>
            </Col>
            <Col>
              <Row style={{ marginBottom: "20px" }}>
                <Col sm={8}>
                  <div className="profile-head">
                    <h4>{user.name}</h4>
                    <h5>{user.roles}</h5>
                  </div>
                </Col>
                <Col>
                  <Button
                    className="profile-edit-btn"
                    variant="outline-success"
                    style={{ marginLeft: "12px", marginBottom: "12px" }}
                    onClick={() => setIsEditOpen(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    className="profile-edit-btn"
                    variant="outline-danger"
                    style={{ marginLeft: "12px" }}
                    onClick={() => setIsChangePassOpen(true)}
                  >
                    Change password
                  </Button>
                  <EditProfileModal
                    handlerModalClose={handlerModalEditClose}
                    show={isEditOpen}
                    user={user}
                  />
                  <ChangePasswordModal
                    handlerModalClose={handlerModalChangePassClose}
                    show={isChangePassOpen}
                    user={user}
                  />
                </Col>
              </Row>
              <Row>
                <div className="tab-content profile-tab" id="myTabContent">
                  <div className="row">
                    <div className="col-md-3">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user._id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label>Address</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user.address}</p>
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Fragment>
      )}
    </>
  )
}

export default Profile
