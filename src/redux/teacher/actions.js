import {
    GET_TEACHERS,
    GET_TEACHERS_ERROR,
    GET_TEACHERS_SUCCESS,

    GET_SINGLE_TEACHER,
    GET_SINGLE_TEACHER_ERROR,
    GET_SINGLE_TEACHER_SUCCESS,

    POST_TEACHERS,
    POST_TEACHERS_ERROR,
    POST_TEACHERS_SUCCESS,
  } from "../actions";
  
  export const getTeacher = () => ({
    type: GET_TEACHERS,
  });
  
  export const getTeachersSuccess = (response) => ({
    type: GET_TEACHERS_SUCCESS,
    payload: response,
  });
  
  export const getTeachersError = (error) => ({
    type: GET_TEACHERS_ERROR,
    payload: error,
  });

  export const getSingleTeacher = () => ({
    type: GET_SINGLE_TEACHER
  });
  
  export const getSingleTeacherSuccess = (response) => ({
    type: GET_SINGLE_TEACHER_SUCCESS,
    payload: response,
  });
  
  export const getSingleTeacherError = (error) => ({
    type: GET_SINGLE_TEACHER_ERROR,
    payload: error,
  });

  export const postTeacher = (history, req) => ({
    type: POST_TEACHERS,
    payload: {history, req}
  });
  
  export const postTeachersSuccess = (response) => ({
    type: POST_TEACHERS_SUCCESS,
    payload: response,
  });
  
  export const postTeachersError = (error) => ({
    type: POST_TEACHERS_ERROR,
    payload: error,
  });
  