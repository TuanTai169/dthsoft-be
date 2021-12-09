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
        dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
      }
    } catch (error) {
      console.log(error)
      error.response && toast.error(error.response.data.message)
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
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
      console.log(error)
      error.response && toast.error(error.response.data.message)
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
    }
  }
}

// ADD cus
export const addCustomer = (newCustomer) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: true })
      const response = await axios.post(`${HOST_API_URL}/customer`, newCustomer)
      if (response.data.success) {
        dispatch({
          type: types.ADD_CUSTOMER,
          payload: response.data.customer,
        })
        dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      error.response && toast.error(error.response.data.message)
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
    }
  }
}

// DELETE CUSTOMER
export const deleteCustomer = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: true })
      const response = await axios.put(`${HOST_API_URL}/customer/delete/${id}`)
      if (response.data.success) {
        dispatch({
          type: types.DELETE_CUSTOMER,
          payload: id,
        })
        dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      error.response && toast.error(error.response.data.message)
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
    }
  }
}

export const updateCustomer = (updateCustomer, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: true })
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
        dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      error.response && toast.error(error.response.data.message)
      dispatch({ type: types.SET_CUSTOMER_LOADING, payload: false })
    }
  }
}
