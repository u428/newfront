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
  
  const INIT_STATE = {
    loading: false,
    error: null,
    teachers: null,
  };
  
  export const teacherReducer = (state = INIT_STATE, { type, payload }) => {
    switch (type) {
      case GET_TEACHERS:
        return { ...state, loading: true };
      case GET_TEACHERS_SUCCESS:
        return { ...state, loading: false, teachers: payload };
      case GET_TEACHERS_ERROR:
        return { ...state, loading: false, error: payload };

      case GET_SINGLE_TEACHER:
          return { ...state, loading: true};
      case GET_SINGLE_TEACHER_SUCCESS:
          return { ...state, loading: false, teachers: payload };
      case GET_SINGLE_TEACHER_ERROR:
          return { ...state, loading: false, error: payload };

      case POST_TEACHERS:
        return { ...state, loading: true };
      case POST_TEACHERS_SUCCESS:
        return { ...state, loading: false, teachers: payload };
      case POST_TEACHERS_ERROR:
        return { ...state, loading: false, error: payload };
      default:
        return { ...state };
    }
  };
  