import React from "react"
import LoadingGif from "../../../assets/images/loading.svg"

const FullLoading = () => {
  return (
    <div className="spinner-container">
      <img src={LoadingGif} className="loader" alt="loading" />
    </div>
  )
}

export default FullLoading
