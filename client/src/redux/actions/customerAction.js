import * as types from "../constants/customerConstant"
import axios from "axios"
import { toast } from "react-toastify"
import { HOST_API_URL } from "./../constants/api"

// READ ALL cus
export const getAllCustomer = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: true })

      const response = await axios.get(`${HOST_API_URL}/customer`)
      if (response.data.success) {
        dispatch({
          type: types.GET_ALL_CUSTOMER,
          payload: response.data.customers,
        })
      }
    } catch (error) {
      toast.error(error)
      dispatch({ type: types.SET_CUSTOMER_ERROR })
    }
  }
}

// READ 1 cus
export const findCustomer = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${HOST_API_URL}/customer/${id}`)

      if (response.data.success) {
        dispatch({
          type: types.FIND_CUSTOMER,
          payload: response.data.customer,
        })
      }
    } catch (error) {
      dispatch({ type: types.SET_CUSTOMER_ERROR })
      toast.error("Sever Error")
    }
  }
}

// ADD cus
export const addCustomer = (newCustomer) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${HOST_API_URL}/customer`, newCustomer)
      if (response.data.success) {
        dispatch({
          type: types.ADD_CUSTOMER,
          payload: response.data.customer,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

// DELETE CUSTOMER
export const deleteCustomer = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${HOST_API_URL}/customer/delete/${id}`)
      if (response.data.success) {
        dispatch({
          type: types.DELETE_CUSTOMER,
          payload: id,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export const updateCustomer = (updateCustomer, id) => {
  return async (dispatch) => {
    try {
      console.log("updateCustomer", updateCustomer)
      const response = await axios.put(
        `${HOST_API_URL}/customer/update/${id}`,
        updateCustomer
      )
      if (response.data.success) {
        dispatch({
          type: types.UPDATE_CUSTOMER,
          payload: response.data.updatedCustomer,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}
