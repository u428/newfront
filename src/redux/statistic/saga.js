import { all, takeEvery, call, put, fork} from "@redux-saga/core/effects";
import { GET_STUDENT_STATISTICS } from "../actions";
import { notificationMessage } from "../services/notificationMessage";

function* watchGetStudentStatistics() {
  yield takeEvery(GET_STUDENT_STATISTICS, workGetStudentStatistics);
}

function* workGetStudentStatistics() {
  const { response, error } = yield call();

  if (response) {
    console.log(response);
    yield put(getSubjectsSuccess(response.data));
  } else {
    yield put(getSubjectsError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}


export default function* statisticsSaga() {
  yield all([
    fork(watchGetStudentStatistics)
  ]);
}
