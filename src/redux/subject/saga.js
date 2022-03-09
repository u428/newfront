import { all, takeEvery, call, put, fork } from "@redux-saga/core/effects";
import {GET_SUBJECTS } from "../actions";
import { fetchGetSubjectsList} from "../services/api";
import { notificationMessage } from "../services/notificationMessage";
import {getSubjectsSuccess, getSubjectsError} from "./actions";

function* watchGetSubjects() {
  yield takeEvery(GET_SUBJECTS, workGetSubjects);
}

function* workGetSubjects() {
  const { response, error } = yield call(fetchGetSubjectsList);

  if (response) {
    console.log(response);
    yield put(getSubjectsSuccess(response.data));
  } else {
    yield put(getSubjectsError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}

export default function* subjectSaga() {
  yield all([
    fork(workGetSubjects)
  ]);
}
