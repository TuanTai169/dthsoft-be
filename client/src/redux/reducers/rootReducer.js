import themeReducer from "./themesReducer";
import serviceReducer from "./serviceReducer";
import roomReducer from "./roomReducer";
import authReducer from "./authReducer";
import bookingReducer from "./bookingReducer";
import customerReducer from "./customerReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  themeReducer,
  serviceReducer,
  roomReducer,
  bookingReducer,
  customerReducer,
  userReducer,
  auth: authReducer,
});

export default rootReducer;
