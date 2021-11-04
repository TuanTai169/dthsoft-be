import * as types from "../constants/roomConstant"
import axios from "axios"
import { toast } from "react-toastify"
import { HOST_API_URL } from "./../constants/api"

// READ ALL Room
export const getAllRoom = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.SET_ROOM_LOADING, payload: true })
      const response = await axios.get(`${HOST_API_URL}/room`)

      if (response.data.success) {
        dispatch({
          type: types.GET_ALL_ROOM,
          payload: response.data.rooms,
        })
      }
    } catch (error) {
      toast.error(error.response.data.message)
      //dispatch({ type: types.SET_ROOM_ERROR })
    }
  }
}

// READ ALL room
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
      const response = await axios.post(`${HOST_API_URL}/room`, newRoom)
      if (response.data.success) {
        dispatch({
          type: types.ADD_ROOM,
          payload: response.data.room,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

// DELETE room
export const deleteRoom = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${HOST_API_URL}/room/delete/${id}`)

      if (response.data.success) {
        dispatch({
          type: types.DELETE_ROOM,
          payload: id,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response)
    }
  }
}

export const updateRoom = (updateRoom) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${HOST_API_URL}/room/update/${updateRoom._id}`,
        updateRoom
      )
      if (response.data.success) {
        dispatch({
          type: types.UPDATE_ROOM,
          payload: response.data.updatedRoom,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response)
    }
  }
}

//GET READY
export const changeStatusRoom = (id, status) => {
  return async (dispatch) => {
    console.log(id, status)
    try {
      const response = await axios.put(
        `${HOST_API_URL}/room/change-status/${status}/${id}`
      )
      console.log(response.data.updatedRoom)
      if (response.data.success) {
        dispatch({
          type: types.UPDATE_ROOM,
          payload: response.data.updatedRoom,
        })
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response)
    }
  }
}
