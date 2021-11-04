import React from "react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 NOT FOUND!</h1>
      <Link to="/">GO BACK</Link>
    </div>
  )
}
export default NotFound
