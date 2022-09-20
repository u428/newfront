import {
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,

  GET_STATISTICS_CHART,
  GET_STATISTICS_CHART_SUCCESS,
  GET_STATISTICS_CHART_ERROR,

  } from "../actions";
  
  const INIT_STATE = {
    loading: false,
    isActive: false,
    error: null,
    statistic: null,
    charts: null,
    subject: {}
  };
  
  export const statisticReducer = (state = INIT_STATE, { type, payload }) => {
    switch (type) {
      case GET_STATISTICS:
        return { ...state, isActive: false, loading: true };
      case GET_STATISTICS_SUCCESS:
        return { ...state, loading: false, isActive: true, statistic: payload};
      case GET_STATISTICS_ERROR:
        return { ...state, loading: false, isActive: false, error: payload };

        case GET_STATISTICS_CHART:
        return { ...state, isActive: false, loading: true };
      case GET_STATISTICS_CHART_SUCCESS:
        return { ...state, loading: false, isActive: true, charts: payload};
      case GET_STATISTICS_CHART_ERROR:
        return { ...state, loading: false, isActive: false, error: payload };
      
      default:
        return { ...state };
    }
  };
  