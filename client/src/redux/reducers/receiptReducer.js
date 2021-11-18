import * as types from "../constants/receiptConstant"

const initialState = {
  receipts: [],
  receipt: null,
  isReceiptLoading: false,
}
const receiptReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_ALL_RECEIPT:
      return {
        ...state,
        receipts: payload,
      }
    case types.SET_RECEIPT_LOADING:
      return {
        ...state,
        isReceiptLoading: payload,
      }
    case types.SET_RECEIPT_ERROR:
      return {
        ...state,
        receipts: [],
        isReceiptLoading: true,
      }
    case types.ADD_RECEIPT:
      return {
        ...state,
        receipts: [...state.receipts, payload],
      }
    case types.FIND_RECEIPT:
      return {
        ...state,
        receipt: payload,
      }
    default:
      return state
  }
}

export default receiptReducer
