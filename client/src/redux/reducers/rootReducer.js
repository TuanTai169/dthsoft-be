import themeReducer from "./themesReducer"
import serviceReducer from "./serviceReducer"
import roomReducer from "./roomReducer"
import authReducer from "./authReducer"
import bookingReducer from "./bookingReducer"
import customerReducer from "./customerReducer"
import userReducer from "./userReducer"
import receiptReducer from "./receiptReducer"

import { combineReducers } from "redux"

const rootReducer = combineReducers({
  themeReducer,
  serviceReducer,
  roomReducer,
  bookingReducer,
  customerReducer,
  userReducer,
  receiptReducer,
  auth: authReducer,
})

export default rootReducer
