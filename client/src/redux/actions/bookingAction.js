import * as types from "../constants/bookingConstant"
import axios from "axios"
import { toast } from "react-toastify"
import { HOST_API_URL } from "./../constants/api"

// READ ALL BOOKING
export const getAllBooking = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_BOOKING_LOADING, payload: true })
      const response = await axios.get(`${HOST_API_URL}/booking`)

      if (response.data.success) {
        dispatch({
          type: types.GET_ALL_BOOKING,
          payload: response.data.bookings,
        })
      }
    } catch (error) {
      toast.error(error.response.data.message)
      dispatch({ type: types.SET_BOOKING_ERROR })
    }
  }
}

// BOOKING/CHECK IN
export const addBooking = (newBooking, status) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${HOST_API_URL}/booking/${status}`,
        newBooking
      )
      if (response.data.success) {
        dispatch({
          type: types.BOOKING_CHECK_IN,
          payload: response.data.booking,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}
