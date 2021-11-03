import * as types from "../constants/roomConstant"

const initialState = {
  rooms: [],
  room: null,
  isRoomLoading: false,
}
const roomReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_ALL_ROOM:
      return {
        ...state,
        rooms: payload,
      }
    case types.SET_ROOM_LOADING:
      return {
        ...state,
        isRoomLoading: payload,
      }
    case types.SET_ROOM_ERROR:
      return {
        ...state,
        rooms: [],
        isRoomLoading: true,
      }
    case types.ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, payload],
      }
    case types.DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== payload),
      }

    case types.UPDATE_ROOM:
      const newRooms = state.rooms.map((room) =>
        room._id === payload._id ? payload : room
      )
      return {
        ...state,
        rooms: newRooms,
      }
    case types.FIND_ROOM:
      return {
        ...state,
        room: payload,
      }
    default:
      return state
  }
}

export default roomReducer
