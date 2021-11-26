import React, { useEffect } from "react"
import "./layout.css"
import { Route, Routes } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import themeAction from "../../redux/actions/themeAction"
import Sidebar from "../Sidebar/Sidebar"
import TopNav from "../Topnav/TopNav"

import Dashboard from "../../containers/Dashboard/Dashboard"
import Customers from "../../containers/Customer/Customers"
import Services from "../../containers/Service/Services"
import Rooms from "../../containers/Room/Rooms"
import Users from "../../containers/User/Users"
import Profile from "../../containers/Profile/Profile"
import Receipt from "../../containers/Receipt/Receipt"
import NotFound from "../Common/NotFound/NotFound"
import { getAllBooking } from "../../redux/actions/bookingAction"
import { getAllCustomer } from "../../redux/actions/customerAction"
import { getAllRoom } from "../../redux/actions/roomAction"
import { getAllService } from "../../redux/actions/serviceAction"
import { getAllUser } from "../../redux/actions/userAction"
import { getAllReceipt } from "../../redux/actions/receiptAction"
import { getStatistic } from "./../../redux/actions/receiptAction"

const Layout = () => {
  const themeReducer = useSelector((state) => state.themeReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light")
    const colorClass = localStorage.getItem("colorMode", "theme-mode-light")
    dispatch(themeAction.setMode(themeClass))
    dispatch(themeAction.setColor(colorClass))
    dispatch(getAllRoom())
    dispatch(getAllCustomer())
    dispatch(getAllBooking())
    dispatch(getAllService())
    dispatch(getAllUser())
    dispatch(getAllReceipt())
    dispatch(getStatistic())
  }, [dispatch])

  return (
    <>
      <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
        <Sidebar />
        <div className="layout__content">
          <TopNav />
          <div className="layout__content-main">
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/customers" exact element={<Customers />} />
              <Route path="/services" exact element={<Services />} />
              <Route path="/room-diagram" exact element={<Rooms />} />
              <Route path="/users" exact element={<Users />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/receipt" exact element={<Receipt />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
