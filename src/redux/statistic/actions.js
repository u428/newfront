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

  export const getStatisticsChart = () => ({
    type: GET_STATISTICS_CHART
  });
  
  export const getStatisticChartSuccess = (response) => ({
    type: GET_STATISTICS_CHART_SUCCESS,
    payload: response,
  });
  
  export const getStatisticChartError = (error) => ({
    type: GET_STATISTICS_CHART_ERROR,
    payload: error,
  });


// SUperADmin

  export const getAllUsers = () => ({
    type: GET_ALL_USERS
  });
  
  export const getAllUsersSuccess = (response) => ({
    type: GET_ALL_USERS_SUCCESS,
    payload: response,
  });
  
  export const getAllUsersError = (error) => ({
    type: GET_ALL_USERS_ERROR,
    payload: error,
  });

  export const getUserAuth = (id) => ({
    type: GET_USERS_AUTH,
    payload: id
  });
  
  export const getUserAuthSuccess = (response) => ({
    type: GET_USERS_AUTH_SUCCESS,
    payload: response,
  });
  
  export const getUserAuthError = (error) => ({
    type: GET_USERS_AUTH_ERROR,
    payload: error,
  });
  