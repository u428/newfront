import { all, takeEvery, call, put, fork } from "@redux-saga/core/effects";
import {GET_STUDENTS, GET_NEW_STUDENTS, GET_SINGLE_STUDENT, DELETE_STUDENT, POST_STUDENT, PUT_STUDENT, POST_STUDENT_GROUP, POST_STUDENT_LOGIN, GET_SINGLE_GROUP_STUDENT } from "../actions";
import { fetchGetStudentList, fetchGetNewStudentList, fetchGetSingleStudent, fetchDeleteStudent, fetchPostStudent, fetchPutStudent, fetchPostStudentLogin, fetchPostStudentGroup, fetchGetSingleStudentGroups} from "../services/api";
import { notificationMessage } from "../services/notificationMessage";
import { getNewStudentsSuccess, getNewStudentsError, postStudentGroupError, postStudentGroupSuccess, postStudentLoginError, postStudentLoginSuccess, getStudentsError, getStudentsSuccess, getSingleStudentSuccess, getSingleStudentError, deleteNewStudentSuccess, deleteNewStudentError, postNewStudentSuccess, postNewStudentError, putNewStudentSuccess, putNewStudentError, getSingleGroupStudentSuccess, getSingleGroupStudentError } from "./actions";

function* watchGetStudents() {
  yield takeEvery(GET_STUDENTS, workGetStudents);
}

function* workGetStudents(req) {

  const {payload} = req;
  console.log(payload);

  const { response, error } = yield call(fetchGetStudentList, payload);

  if (response) {
    // console.log(JSON.parse(response));
    yield put(getStudentsSuccess(response.data));
  } else {
    yield put(getStudentsError(error.response.data));
    notificationMessage("error", error.response.data);
  }
}

function* watchGetNewStudents() {
  yield takeEvery(GET_NEW_STUDENTS, workGetNewStudents);
}

function* workGetNewStudents(req) {

  const {payload} = req;
  console.log(payload);

  const { response, error } = yield call(fetchGetNewStudentList, payload);

  if (response) {
    console.log(response);
    yield put(getNewStudentsSuccess(response.data));
  } else {
    yield put(getNewStudentsError(error.response.data));
    notificationMessage("error", error.response.data);
  }
}


function* watchGetSingleStudent() {
  yield takeEvery(GET_SINGLE_STUDENT, workGetSingleStudent);
}

function* workGetSingleStudent({payload}) {
console.log(payload);
  const {history, req} = payload;
console.log(req);
  const { response, error } = yield call(fetchGetSingleStudent,req);
  console.log(response);
  if (response) {
    yield put(getSingleStudentSuccess(response.data));
  } else {
    yield put(getSingleStudentError(error.response.data.message));
    notificationMessage("error", error.response.data);
  }
}


function* watchGetSingleStudentGroups() {
  yield takeEvery(GET_SINGLE_GROUP_STUDENT, workGetSingleStudentGroups);
}

function* workGetSingleStudentGroups({payload}) {
console.log(payload);
  const {history, req} = payload;
console.log(req);
  const { response, error } = yield call(fetchGetSingleStudentGroups,req);
  console.log(response);
  if (response) {
    yield put(getSingleGroupStudentSuccess(response.data));
    history.push("/admin/view/student")
  } else {
    yield put(getSingleGroupStudentError(error.response.data.message));
    notificationMessage("error", error.response.data);
  }
}

function* watchDeleteStudent() {
  yield takeEvery(DELETE_STUDENT, workDeleteStudent);
}

function* workDeleteStudent({id}) {
  console.log(id);
  const { response, error } = yield call(fetchDeleteStudent, id);
  console.log(response);
  if (response) {
    console.log(response);
    yield put(deleteNewStudentSuccess(response.data.teachers));
  } else {
    console.log(error);
    yield put(deleteNewStudentError(error.response.data.message));
    notificationMessage("error", "SORRY: there is some ERRORS");
  }
}

function* watchPostStudent() {
  yield takeEvery(POST_STUDENT, workPostStudent);
}

function* workPostStudent({payload}) {
 const {history, req} = payload;
 console.log(payload);
 console.log(req);

  const { response, error } = yield call(fetchPostStudent, req);

  if (response) {
    yield put(postNewStudentSuccess(response));
    notificationMessage("success", "Student qoshildi");
  } else {
    yield put(postNewStudentError(error.response.data.message));
    notificationMessage("error", "SORRY: there is some ERRORS");
  }
}


function* watchPostStudentGroup() {
  yield takeEvery(POST_STUDENT_GROUP, workPostStudentGroup);
}

function* workPostStudentGroup({payload}) {
 const {history, req} = payload;
 console.log(payload);
 console.log(req);

  const { response, error } = yield call(fetchPostStudentGroup, req);

  if (response) {
    yield put(postStudentGroupSuccess(response));
    notificationMessage("success", "Student qoshildi");
  } else {
    yield put(postStudentGroupError(error.response.data.message));
    notificationMessage("error", "SORRY: there is some ERRORS");
  }
}


function* watchPostStudentLogin() {
  yield takeEvery(POST_STUDENT_LOGIN, workPostStudentLogin);
}

function* workPostStudentLogin({payload}) {
 const {history, req} = payload;
 console.log(payload);
 console.log(req);

  const { response, error } = yield call(fetchPostStudentLogin, req);

  if (response) {
    yield put(postStudentLoginSuccess(response));
    notificationMessage("success", "Studentga Login parol qoshildi");
  } else {
    yield put(postStudentLoginError(error.response.data));
    notificationMessage("error", "SORRY: there is some ERRORS");
  }
}


function* watchPutStudent() {
  yield takeEvery(PUT_STUDENT, workPutStudent);
}

function* workPutStudent({payload}) {
 const {history, req} = payload;

  const { response, error } = yield call(fetchPutStudent, req);

  if (response) {
    yield put(putNewStudentSuccess(response));
    notificationMessage("success", "Student omadli ozgartirildi");
  } else {
    yield put(putNewStudentError(error.response.data));
    notificationMessage("error", "SORRY: there is some ERRORS");
  }
}



export default function* studentSaga() {
  yield all([
    fork(watchGetStudents),
    fork(watchGetNewStudents),
    fork(watchGetSingleStudent),
    fork(watchPostStudent),
    fork(watchPutStudent),
    fork(watchDeleteStudent),
    fork(watchPostStudentGroup),
    fork(watchGetSingleStudentGroups),
    fork(watchPostStudentLogin)
  ]);
}
