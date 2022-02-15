import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { productReducer } from "./product/reducer";
import { teacherReducer } from "./teacher/reducer";

export const rootReducer = combineReducers({
  //  reducer
  authReducer,
  productReducer,
  teacherReducer
});
