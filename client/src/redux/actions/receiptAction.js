import * as types from "../constants/receiptConstant"
import axios from "axios"
import { toast } from "react-toastify"
import { HOST_API_URL } from "./../constants/api"

// READ ALL Receipt
export const getAllReceipt = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_RECEIPT_LOADING, payload: true })

      const response = await axios.get(`${HOST_API_URL}/receipt`)
      if (response.data.success) {
        dispatch({
          type: types.GET_ALL_RECEIPT,
          payload: response.data.receipts,
        })
      }
    } catch (error) {
      console.log(error)
      error.response.data && toast.error(error.response.data.message)
      dispatch({ type: types.SET_RECEIPT_ERROR })
    }
  }
}

// CHECK OUT
export const checkOut = (newReceipt) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${HOST_API_URL}/receipt`, newReceipt)
      if (response.data.success) {
        dispatch({
          type: types.ADD_RECEIPT,
          payload: response.data.receipt,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      error.response.data && toast.error(error.response.data.message)
    }
  }
}
