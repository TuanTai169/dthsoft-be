import * as types from "../constants/serviceConstant"
import axios from "axios"
import { toast } from "react-toastify"
import { HOST_API_URL } from "./../constants/api"

// READ ALL Service
export const getAllService = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_SERVICE_LOADING, payload: true })

      const response = await axios.get(`${HOST_API_URL}/service`)
      if (response.data.success) {
        dispatch({
          type: types.GET_ALL_SERVICE,
          payload: response.data.services,
        })
        dispatch({ type: types.SET_SERVICE_LOADING, payload: false })
      }
    } catch (error) {
      console.log(error)
      error.response && toast.error(error.response.data.message)
      dispatch({ type: types.SET_SERVICE_ERROR })
    }
  }
}

// READ ALL Service
export const findService = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_SERVICE_LOADING, payload: true })
      const response = await axios.get(`${HOST_API_URL}/service/${id}`)

      if (response.data.success) {
        dispatch({
          type: types.FIND_SERVICE,
          payload: response.data.service,
        })
      }
    } catch (error) {
      dispatch({ type: types.SET_SERVICE_ERROR })
      toast.error("Sever Error")
    }
  }
}

// ADD Service
export const addService = (newService) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_SERVICE_LOADING, payload: true })
      const response = await axios.post(`${HOST_API_URL}/service`, newService)
      if (response.data.success) {
        dispatch({
          type: types.ADD_SERVICE,
          payload: response.data.service,
        })
        toast.success(response.data.message)
        dispatch({ type: types.SET_SERVICE_LOADING, payload: false })
      }
    } catch (error) {
      console.log(error)
      error.response && toast.error(error.response.data.message)
    }
  }
}

// DELETE SERVICE
export const deleteService = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_SERVICE_LOADING, payload: true })
      const response = await axios.put(`${HOST_API_URL}/service/delete/${id}`)
      if (response.data.success) {
        dispatch({
          type: types.DELETE_SERVICE,
          payload: id,
        })
        toast.success(response.data.message)
        dispatch({ type: types.SET_SERVICE_LOADING, payload: false })
      }
    } catch (error) {
      console.log(error)
      error.response && toast.error(error.response.data.message)
    }
  }
}

export const updateService = (updateService) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_SERVICE_LOADING, payload: true })
    try {
      const response = await axios.put(
        `${HOST_API_URL}/service/update/${updateService._id}`,
        updateService
      )
      if (response.data.success) {
        dispatch({
          type: types.UPDATE_SERVICE,
          payload: response.data.updatedService,
        })
        dispatch({ type: types.SET_SERVICE_LOADING, payload: false })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      error.response && toast.error(error.response.data.message)
    }
  }
}
