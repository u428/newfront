import {
  GET_STUDENT_STATISTICS,
  GET_STUDENT_STATISTICS_SUCCESS,
  GET_STUDENT_STATISTICS_ERROR,
    
  } from "../actions";
  
  export const getStudentStatistics = () => ({
    type: GET_STUDENT_STATISTICS
  });
  
  export const getStudentStatisticSuccess = (response) => ({
    type: GET_STUDENT_STATISTICS_SUCCESS,
    payload: response,
  });
  
  export const getStudentStatisticError = (error) => ({
    type: GET_STUDENT_STATISTICS_ERROR,
    payload: error,
  });
  