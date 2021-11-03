import * as types from "../constants/serviceConstant"
//import { error } from "react-notification-system-redux"

const initialState = {
  services: [],
  service: null,
  isServiceLoading: false,
}
const serviceReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_ALL_SERVICE:
      return {
        ...state,
        services: payload,
      }
    case types.SET_SERVICE_LOADING:
      return {
        ...state,
        isServiceLoading: payload,
      }
    case types.SET_SERVICE_ERROR:
      return {
        ...state,
        services: [],
        isServiceLoading: true,
      }
    case types.ADD_SERVICE:
      return {
        ...state,
        services: [...state.services, payload],
      }
    case types.DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter((service) => service._id !== payload),
      }

    case types.UPDATE_SERVICE:
      const newServices = state.services.map((service) =>
        service._id === payload._id ? payload : service
      )
      return {
        ...state,
        services: newServices,
      }
    case types.FIND_SERVICE:
      return {
        ...state,
        service: payload,
      }
    default:
      return state
  }
}

export default serviceReducer
