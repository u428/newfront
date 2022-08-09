import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { teacherReducer } from "./teacher/reducer";
import {languageReducer} from "./lang/reducer";
import { subjectReducer } from "./subject/reducer";
import { groupReducer } from "./group/reducer";
import { studentReducer } from "./student/reducer";
import { statisticReducer } from "./statistic/reducer";

export const rootReducer = combineReducers({
  //  reducer
  authReducer,
  teacherReducer,
  languageReducer,
  subjectReducer,
  groupReducer,
  studentReducer,
  statisticReducer
});
