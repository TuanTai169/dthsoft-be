import * as types from "../constants/authConstant"

const initialState = {
  user: null,
  isAuthenticated: false,
  authLoading: true,
}
const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_AUTH:
      return {
        ...state,
        authLoading: false,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      }
    default:
      return state
  }
}
export default authReducer
