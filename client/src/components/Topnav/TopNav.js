import "./topnav.css"
import "../Common/dropdown/dropdown.css"

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import male_avatar from "../../assets/images/male_avatar.png"
import ThemeMenu from "../../containers/Theme/ThemeMenu"
import { logout } from "../../redux/actions/authAction"

const TopNav = () => {
  const user = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlerLogout = () => {
    dispatch(logout())
  }
  const handlerToProfile = () => {
    navigate("/profile")
  }

  return (
    <div className="topnav">
      <div className="topnav__left"></div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <div
            className="topnav__right-user"
            style={{ cursor: "pointer" }}
            onClick={handlerToProfile}
          >
            <div className="topnav__right-user__image">
              <img src={user.image ? user.image : male_avatar} alt="avatar" />
            </div>
            <div className="topnav__right-user__name">{user.name}</div>
          </div>
        </div>
        {/* <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/customers">View All</Link>}
          />
        </div> */}
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
        <div className="topnav__right-item">
          <Button
            className="logout"
            style={{ padding: "0px" }}
            variant="none"
            onClick={handlerLogout}
          >
            <i className="bx bx-log-in-circle" style={{ fontSize: "36px" }}></i>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopNav
