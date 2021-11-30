import * as types from "../constants/roomConstant"
import axios from "axios"
import { toast } from "react-toastify"
import { HOST_API_URL } from "./../constants/api"

// READ ALL Room
export const getAllRoom = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${HOST_API_URL}/room`)

      if (response.data.success) {
        dispatch({
          type: types.GET_ALL_ROOM,
          payload: response.data.rooms,
        })
      }
    } catch (error) {
      toast.error(error.response.data.message)
      dispatch({ type: types.SET_ROOM_ERROR })
    }
  }
}

// READ 1 room
export const findRoom = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${HOST_API_URL}/room/${id}`)

      if (response.data.success) {
        dispatch({
          type: types.FIND_ROOM,
          payload: response.data.room,
        })
      }
    } catch (error) {
      dispatch({ type: types.SET_ROOM_ERROR })
      toast.error(error.response)
    }
  }
}

// ADD Room
export const addRoom = (newRoom) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_ROOM_LOADING, payload: true })
      const response = await axios.post(`${HOST_API_URL}/room`, newRoom)
      if (response.data.success) {
        dispatch({
          type: types.ADD_ROOM,
          payload: response.data.room,
        })
        dispatch({ type: types.SET_ROOM_LOADING, payload: false })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: types.SET_ROOM_LOADING, payload: false })
      error.response.data && toast.error(error.response.data.message)
    }
  }
}

// DELETE room
export const deleteRoom = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_ROOM_LOADING, payload: true })
      const response = await axios.put(`${HOST_API_URL}/room/delete/${id}`)

      if (response.data.success) {
        dispatch({
          type: types.DELETE_ROOM,
          payload: id,
        })
        dispatch({ type: types.SET_ROOM_LOADING, payload: false })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: types.SET_ROOM_LOADING, payload: false })
      error.response.data && toast.error(error.response.data.message)
    }
  }
}

export const updateRoom = (updateRoom) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_ROOM_LOADING, payload: true })

      const response = await axios.put(
        `${HOST_API_URL}/room/update/${updateRoom._id}`,
        updateRoom
      )
      if (response.data.success) {
        dispatch({
          type: types.UPDATE_ROOM,
          payload: response.data.updatedRoom,
        })
        dispatch({ type: types.SET_ROOM_LOADING, payload: false })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: types.SET_ROOM_LOADING, payload: false })
      error.response.data && toast.error(error.response.data.message)
    }
  }
}

//GET READY
export const changeStatusRoom = (id, status) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_ROOM_LOADING, payload: true })
      const response = await axios.put(
        `${HOST_API_URL}/room/change-status/${status}/${id}`
      )
      if (response.data.success) {
        dispatch({
          type: types.UPDATE_ROOM,
          payload: response.data.updatedRoom,
        })
        dispatch({ type: types.SET_ROOM_LOADING, payload: false })
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: types.SET_ROOM_LOADING, payload: false })
      error.response.data && toast.error(error.response.data.message)
    }
  }
}
