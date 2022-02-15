import { all, takeEvery, call, put, fork } from "@redux-saga/core/effects";
import { GET_TEACHERS, POST_TEACHERS, GET_SINGLE_TEACHER } from "../actions";
import { fetchGetTeachersList, fetchPostTeachersList, fetchGetSingleTeacher } from "../services/api";
import { notificationMessage } from "../services/notificationMessage";
import { getTeachersError, getTeachersSuccess, postTeachersError, postTeachersSuccess, getSingleTeacherSuccess, getSingleTeacherError } from "./actions";

function* watchGetTeachers() {
  yield takeEvery(GET_TEACHERS, workGetTeachers);
}

function* workGetTeachers() {
  const { response, error } = yield call(fetchGetTeachersList);

  if (response) {
    console.log(response);
    yield put(getTeachersSuccess(response.data));
  } else {
    yield put(getTeachersError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}


function* watchGetSingleTeacher() {
  yield takeEvery(GET_SINGLE_TEACHER, workGetSingleTeacher);
}

function* workGetSingleTeacher(id) {
  // const id = payload;
  const { response, error } = yield call(fetchGetSingleTeacher, id);
console.log(response);
  if (response) {
    console.log(response);
    yield put(getSingleTeacherSuccess(response.data));
  } else {
    yield put(getSingleTeacherError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}



function* watchPostTeachers() {
  yield takeEvery(POST_TEACHERS, workPostTeachers);
}

function* workPostTeachers() {
  const { response, error } = yield call(fetchPostTeachersList);

  if (response) {
    yield put(postTeachersSuccess(response));
    notificationMessage("success", "Teacher qoshildi");
  } else {
    yield put(postTeachersError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}

export default function* teacherSaga() {
  yield all([
    fork(watchGetTeachers),
    fork(watchGetSingleTeacher),
    fork(watchPostTeachers)
  ]);
}
