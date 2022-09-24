import { all, takeEvery, call, put, fork} from "@redux-saga/core/effects";
import { GET_ALL_USERS, GET_STATISTICS, GET_STATISTICS_CHART, GET_USERS_AUTH } from "../actions";
import { fetchDashboardStatistic, fetchDashboardStatisticChart, fetchGetAllControllers, fetchGetControllerAuth } from "../services/api";
import { notificationMessage } from "../services/notificationMessage";
import { getAllUsersError, getAllUsersSuccess, getStatisticChartError, getStatisticChartSuccess, getStatisticError, getStatisticSuccess, getUserAuthError, getUserAuthSuccess } from "./actions";

function* watchGetStatistics() {
  yield takeEvery(GET_STATISTICS, workGetStatistics);
}

function* workGetStatistics() {
  const { response, error } = yield call(fetchDashboardStatistic);
  
  if (response) {
    console.log(response);
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
    console.log(response);
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
    console.log(response);
    yield put(getAllUsersSuccess(response.data));
  } else {
    yield put(getAllUsersError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}

function* watchGetUserAuth() {
  yield takeEvery(GET_USERS_AUTH, workGetUserAuth);
}

function* workGetUserAuth() {
  const { response, error } = yield call(fetchGetControllerAuth);
  
  if (response) {
    console.log(response);
    yield put(getUserAuthSuccess(response.data));
  } else {
    yield put(getUserAuthError(error.response.data.message));
    notificationMessage("error", error.response.data.message);
  }
}


export default function* statisticsSaga() {
  yield all([
    fork(watchGetStatistics),
    fork(watchGetStatisticsChart),
    fork(watchGetAllUsers),
    fork(watchGetUserAuth)
  ]);
}
