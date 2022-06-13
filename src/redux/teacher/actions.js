import {
    GET_TEACHERS,
    GET_TEACHERS_ERROR,
    GET_TEACHERS_SUCCESS,

    VIEW_TEACHER,
    VIEW_TEACHER_SUCCESS,
    VIEW_TEACHER_ERROR,

    DELETE_TEACHER,
    DELETE_TEACHER_SUCCESS,
    DELETE_TEACHER_ERROR,

    GET_SINGLE_TEACHER,
    GET_SINGLE_TEACHER_ERROR,
    GET_SINGLE_TEACHER_SUCCESS,

    POST_TEACHERS,
    POST_TEACHERS_ERROR,
    POST_TEACHERS_SUCCESS,

    CHECK_STUDENT_TEACHER,
    CHECK_STUDENT_TEACHER_ERROR,
    CHECK_STUDENT_TEACHER_SUCCESS,

    PUT_TEACHERS,
    PUT_TEACHERS_ERROR,
    PUT_TEACHERS_SUCCESS,
  } from "../actions";
  
  export const getTeachers = (req) => ({
    type: GET_TEACHERS,
    payload: req,
  });
  
  export const getTeachersSuccess = (response) => ({
    type: GET_TEACHERS_SUCCESS,
    payload: response,
  });
  
  export const getTeachersError = (error) => ({
    type: GET_TEACHERS_ERROR,
    payload: error,
  });

  export const viewTeacher = (history, id) => ({
    type: VIEW_TEACHER,
    payload: {history, id},
  });
  
  export const viewTeacherSuccess = (response) => ({
    type: VIEW_TEACHER_SUCCESS,
    payload: response,
  });
  
  export const viewTeacherError = (error) => ({
    type: VIEW_TEACHER_ERROR,
    payload: error,
  });

  export const deleteTeacher = (id) => ({
    type: DELETE_TEACHER,
    id: id
  });
  
  export const deleteTeacherSuccess = (response) => ({
    type: DELETE_TEACHER_SUCCESS,
    payload: response,
  });
  
  export const deleteTeacherError = (error) => ({
    type: DELETE_TEACHER_ERROR,
    payload: error,
  });

  export const getSingleTeacher = (id) => ({
    type: GET_SINGLE_TEACHER,
    id: id
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


  export const checkStudentTeacher = (req) => ({
    type: CHECK_STUDENT_TEACHER,
    payload: req
  });
  
  export const checkStudentTeacherSuccess = (response) => ({
    type: CHECK_STUDENT_TEACHER_SUCCESS,
    payload: response,
  });
  
  export const checkStudentTeacherError = (error) => ({
    type: CHECK_STUDENT_TEACHER_ERROR,
    payload: error,
  });


  export const putTeacher = (history, req) => ({
    type: PUT_TEACHERS,
    payload: {history, req}
  });
  
  export const putTeachersSuccess = (response) => ({
    type: PUT_TEACHERS_SUCCESS,
    payload: response,
  });
  
  export const putTeachersError = (error) => ({
    type: PUT_TEACHERS_ERROR,
    payload: error,
  });
  