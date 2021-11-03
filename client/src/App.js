import React, { useEffect } from "react"
import { HashRouter, Route, Switch } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "./containers/Login/Login"
import NotFound from "./components/Common/NotFound/NotFound"

import { loadUser } from "./redux/actions/authAction"
import { useDispatch } from "react-redux"
import ProtectedRoute from "./routing/ProtectedRoute"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const dispatch = useDispatch()

  useEffect(() => dispatch(loadUser()), [dispatch])

  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Layout} />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  )
}

export default App
