import React, { useEffect } from "react"
import "./layout.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
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
import NotFound from "../Common/NotFound/NotFound"
import { getAllBooking } from "../../redux/actions/bookingAction"
import { getAllCustomer } from "../../redux/actions/customerAction"
import { getAllRoom } from "../../redux/actions/roomAction"
import { getAllService } from "../../redux/actions/serviceAction"
import { getAllUser } from "../../redux/actions/userAction"
import { getAllReceipt } from "../../redux/actions/receiptAction"

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
  }, [dispatch])

  return (
    <>
      <Router>
        <Route
          render={(props) => (
            <div
              className={`layout ${themeReducer.mode} ${themeReducer.color}`}
            >
              <Sidebar {...props} />
              <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/services" component={Services} />
                    <Route path="/room-diagram" component={Rooms} />
                    <Route path="/users" component={Users} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/*" component={NotFound} />
                  </Switch>
                </div>
              </div>
            </div>
          )}
        />
      </Router>
    </>
  )
}

export default Layout
