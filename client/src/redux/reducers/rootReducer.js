import themeReducer from "./themeReducer"
import serviceReducer from "./serviceReducer"
import roomReducer from "./roomReducer"
import authReducer from "./authReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  themeReducer,
  serviceReducer,
  roomReducer,
  auth: authReducer,
})

export default rootReducer
