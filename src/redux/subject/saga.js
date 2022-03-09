import { all, takeEvery, call, put, fork } from "@redux-saga/core/effects";
import {GET_SUBJECTS, POST_SUBJECT, PUT_SUBJECT } from "../actions";
import { fetchGetSubjectsList, fetchPostSubject, fetchPutSubject} from "../services/api";
import { notificationMessage } from "../services/notificationMessage";
import {getSubjectsSuccess, getSubjectsError, postSubjectSuccess, postSubjectError, putSubjectSuccess, putSubjectError} from "./actions";

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

function* watchPostSubjects() {
  yield takeEvery(POST_SUBJECT, workPostSubjects);
}

function* workPostSubjects({payload}) {
const {history, req} =payload;

  const { response, error } = yield call(fetchPostSubject, req);

  if (response) {
    console.log(response);
    yield put(postSubjectSuccess(response.data));
  } else {
    yield put(postSubjectError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}

function* watchPutSubjects() {
  yield takeEvery(PUT_SUBJECT, workPutSubjects);
}

function* workPutSubjects({payload}) {
const {history, req} =payload;

  const { response, error } = yield call(fetchPutSubject, req);

  if (response) {
    console.log(response);
    yield put(putSubjectSuccess(response.data));
  } else {
    yield put(putSubjectError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}

export default function* subjectSaga() {
  yield all([
    fork(watchGetSubjects),
    fork(watchPutSubjects),
    fork(watchPostSubjects)
  ]);
}
