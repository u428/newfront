import { all, takeEvery, call, put, fork} from "@redux-saga/core/effects";
import { ADD_USERS_AUTH, GET_ALL_USERS, GET_STATISTICS, GET_STATISTICS_CHART, GET_USERS_AUTH, PUT_USERS_AUTH } from "../actions";
import { fetchAddControllerAuth, fetchDashboardStatistic, fetchDashboardStatisticChart, fetchGetAllControllers, fetchGetControllerAuth, fetchPutControllerAuth } from "../services/api";
import { notificationMessage } from "../services/notificationMessage";
import { addUserAuthError, addUserAuthSuccess, getAllUsersError, getAllUsersSuccess, getStatisticChartError, getStatisticChartSuccess, getStatisticError, getStatisticSuccess, getUserAuthError, getUserAuthSuccess, putUserAuthError, putUserAuthSuccess } from "./actions";

function* watchGetStatistics() {
  yield takeEvery(GET_STATISTICS, workGetStatistics);
}

function* workGetStatistics() {
  const { response, error } = yield call(fetchDashboardStatistic);
  
  if (response) {

    yield put(getStatisticSuccess(response.data));
  } else {
    yield put(getStatisticError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}

function* watchGetStatisticsChart() {
  yield takeEvery(GET_STATISTICS_CHART, workGetStatisticsChart);
}

function* workGetStatisticsChart() {
  const { response, error } = yield call(fetchDashboardStatisticChart);
  
  if (response) {
    yield put(getStatisticChartSuccess(response.data));
  } else {
    yield put(getStatisticChartError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}


// Super Admin
function* watchGetAllUsers() {
  yield takeEvery(GET_ALL_USERS, workGetAllUsers);
}

function* workGetAllUsers() {
  const { response, error } = yield call(fetchGetAllControllers);
  
  if (response) {
    yield put(getAllUsersSuccess(response.data));
  } else {
    yield put(getAllUsersError(error.response.data.message));
    notificationMessage("error", "Bu yerda qandaydir xatolik ro'y berdi");
  }
}

function* watchGetUserAuth() {
  yield takeEvery(GET_USERS_AUTH, workGetUserAuth);
}

function* workGetUserAuth({payload}) {

  const { response, error } = yield call(fetchGetControllerAuth, payload);
  
  if (response) {

    yield put(getUserAuthSuccess(response.data));
  } else {
    yield put(getUserAuthError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}

function* watchPutUserAuth() {
  yield takeEvery(PUT_USERS_AUTH, workPutUserAuth);
}

function* workPutUserAuth({payload}) {

  const { response, error } = yield call(fetchPutControllerAuth, payload);
  
  if (response) {
    yield put(putUserAuthSuccess(response.data));
  } else {
    yield put(putUserAuthError(error.response.data));
    notificationMessage("error", "Xatolik yuz berdi");
  }
}

function* watchAddUserAuth() {
  yield takeEvery(ADD_USERS_AUTH, workAddUserAuth);
}

function* workAddUserAuth({payload}) {

  const { response, error } = yield call(fetchAddControllerAuth, payload);
  if (response) {
    yield put(addUserAuthSuccess(response.data));
  } else {
    yield put(addUserAuthError(error.response.data));
    notificationMessage("error", "Xatolik yuz berdi");
  }
}


export default function* statisticsSaga() {
  yield all([
    fork(watchGetStatistics),
    fork(watchGetStatisticsChart),
    fork(watchGetAllUsers),
    fork(watchGetUserAuth),
    fork(watchPutUserAuth),
    fork(watchAddUserAuth)
  ]);
}
