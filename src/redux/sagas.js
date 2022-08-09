import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import teacherSaga from "./teacher/saga"
import languagesSaga from "./lang/saga";
import subjectSaga from "./subject/saga";
import groupSaga from "./group/saga";
import studentSaga from "./student/saga";
import statisticsSaga from "./statistic/saga";

export default function* rootSaga() {
  yield all([authSaga(), teacherSaga(), languagesSaga(), subjectSaga(), groupSaga(), studentSaga(), statisticsSaga()]);
}
