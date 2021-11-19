import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "./containers/Login/Login"
import ForgotPassword from "./containers/Login/ForgotPassword"
import ResetPassword from "./containers/Login/ResetPassword"

import { loadUser } from "./redux/actions/authAction"
import { useDispatch } from "react-redux"
import ProtectedRoute from "./routing/ProtectedRoute"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-datepicker/dist/react-datepicker.css"

function App() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(loadUser()), [dispatch])

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact />
          <ProtectedRoute exact path="/" component={Layout} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route
            exact
            path="/api/auth/reset-password/:token"
            component={ResetPassword}
          />
        </Switch>
      </Router>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  )
}

export default App
