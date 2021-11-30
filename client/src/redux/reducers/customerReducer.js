import * as types from "../constants/customerConstant"

const initialState = {
  customers: [],
  customer: null,
  isCustomerLoading: false,
}
const customerReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_ALL_CUSTOMER:
      return {
        ...state,
        customers: payload,
      }
    case types.SET_CUSTOMER_LOADING:
      return {
        ...state,
        isCustomerLoading: payload,
      }
    case types.SET_CUSTOMER_ERROR:
      return {
        ...state,
        customers: [],
        isCustomerLoading: true,
      }
    case types.ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, payload],
      }
    case types.DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer._id !== payload
        ),
      }

    case types.UPDATE_CUSTOMER:
      const newCustomers = state.customers.map((customer) =>
        customer._id === payload._id ? payload : customer
      )
      return {
        ...state,
        customers: newCustomers,
      }
    case types.FIND_CUSTOMER:
      return {
        ...state,
        customer: payload,
      }
    default:
      return state
  }
}

export default customerReducer
