import {
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,

  GET_STATISTICS_CHART,
  GET_STATISTICS_CHART_SUCCESS,
  GET_STATISTICS_CHART_ERROR,
    
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
  