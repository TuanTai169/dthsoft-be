import * as types from "../constants/bookingConstant"

const initialState = {
  bookings: [],
  booking: null,
  isBookingLoading: false,
}
const bookingReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_ALL_BOOKING:
      return {
        ...state,
        bookings: payload,
      }
    case types.SET_BOOKING_LOADING:
      return {
        ...state,
        isBookingLoading: payload,
      }
    case types.SET_BOOKING_ERROR:
      return {
        ...state,
        bookings: [],
        isBookingLoading: true,
      }
    case types.BOOKING_CHECK_IN:
      return {
        ...state,
        bookings: [...state.bookings, payload],
      }
    default:
      return state
  }
}

export default bookingReducer
