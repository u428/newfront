import { all, takeEvery, call, put, fork} from "@redux-saga/core/effects";
import { GET_STATISTICS, GET_STATISTICS_CHART } from "../actions";
import { fetchDashboardStatistic, fetchDashboardStatisticChart } from "../services/api";
import { notificationMessage } from "../services/notificationMessage";
import { getStatisticChartError, getStatisticChartSuccess, getStatisticError, getStatisticSuccess } from "./actions";

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


export default function* statisticsSaga() {
  yield all([
    fork(watchGetStatistics),
    fork(watchGetStatisticsChart)
  ]);
}
