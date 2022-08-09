import {
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,
    
  } from "../actions";
  
  export const getStatistics = () => ({
    type: GET_STATISTICS
  });
  
  export const getStatisticSuccess = (response) => ({
    type: GET_STATISTICS_SUCCESS,
    payload: response,
  });
  
  export const getStatisticError = (error) => ({
    type: GET_STATISTICS_ERROR,
    payload: error,
  });
  