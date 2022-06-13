import {
  GET_STUDENT_STATISTICS,
  GET_STUDENT_STATISTICS_SUCCESS,
  GET_STUDENT_STATISTICS_ERROR,

  } from "../actions";
  
  const INIT_STATE = {
    loading: false,
    isActive: false,
    error: null,
    statistic: null,
    subject: {}
  };
  
  export const statisticReducer = (state = INIT_STATE, { type, payload }) => {
    switch (type) {
      case GET_STUDENT_STATISTICS:
        return { ...state, isActive: false, loading: true };
      case GET_STUDENT_STATISTICS_SUCCESS:
        return { ...state, loading: false, isActive: true, statistic: payload};
      case GET_STUDENT_STATISTICS_ERROR:
        return { ...state, loading: false, isActive: false, error: payload };
    }
  };
  