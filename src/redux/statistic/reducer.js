import {
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,

  GET_STATISTICS_CHART,
  GET_STATISTICS_CHART_SUCCESS,
  GET_STATISTICS_CHART_ERROR,

  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,

  GET_USERS_AUTH,
  GET_USERS_AUTH_SUCCESS,
  GET_USERS_AUTH_ERROR,

  } from "../actions";
  
  const INIT_STATE = {
    loading: false,
    isActive: false,
    error: null,
    statistic: null,
    charts: null,
    users: null,
    userAuth: null,
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

// Super Admin
      case GET_ALL_USERS:
        return { ...state, isActive: false, loading: true };
      case GET_ALL_USERS_SUCCESS:
        return { ...state, loading: false, isActive: true, users: payload};
      case GET_ALL_USERS_ERROR:
        return { ...state, loading: false, isActive: false, error: payload };

        case GET_USERS_AUTH:
        return { ...state, isActive: false, loading: true };
      case GET_USERS_AUTH_SUCCESS:
        return { ...state, loading: false, isActive: true, userAuth: payload};
      case GET_USERS_AUTH_ERROR:
        return { ...state, loading: false, isActive: false, error: payload };
      
      default:
        return { ...state };
    }
  };
  