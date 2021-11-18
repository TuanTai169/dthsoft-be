import "./profile.css"
import React, { useEffect } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import EditProfileModal from "./EditProfileModal"
import { loadUser } from "./../../redux/actions/authAction"

function Profile() {
  const user = useSelector((state) => state.auth.user)
  const users = useSelector((state) => state.userReducer.users)
  const dispatch = useDispatch()
  useEffect(() => dispatch(loadUser()), [dispatch, users])

  const [isEditOpen, setIsEditOpen] = useState(false)

  const handlerModalEditClose = () => setIsEditOpen(false)

  return (
    <>
      <Row>
        <Col sm={4}>
          <div className="profile-img">
            <img src={user.image} alt="" />
            <div className="file btn btn-lg btn-primary">
              Change Avatar
              <input type="file" name="file" />
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
                variant="outline-secondary"
                style={{ marginLeft: "12px" }}
                onClick={() => setIsEditOpen(true)}
              >
                <i className="bx bxs-edit-alt icon-bg"></i> Edit Profile
              </Button>
              {
                <EditProfileModal
                  handlerModalClose={handlerModalEditClose}
                  show={isEditOpen}
                  user={user}
                />
              }
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
    </>
  )
}

export default Profile
